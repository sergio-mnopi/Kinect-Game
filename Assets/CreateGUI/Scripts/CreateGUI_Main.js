var DataHolder : CreateGUI_DataHolder;
var ElementLock : String = "";
var PageLock : String = "";
var BoxBg : Texture2D;
var ScreenRes : Vector2;
var Data : CreateGUI_Data;
var TargetPage = "";
var Interface : Object;

private var MouseStartedDragging : Vector2;
private var StartedDragging : Vector2;
private var OrgSize : Vector2 = new Vector2(0,0);
private var ReleaseClick : boolean = true;
private var DraggingSomething: boolean = false;
private var oldColor : Color;
private var invTex : Texture2D;
var CustomClick = false;
var Grid : float = 1;
var MousePosition : Vector2;
function OnGUI(){
    
    if(DataHolder && DataHolder.Data) Data = DataHolder.Data;
    
    ScreenRes = Vector2(Screen.width,Screen.height);
    
    if(DataHolder)
	if(DataHolder.Data && DataHolder.Data.elements && DataHolder.Data.Pages){
            Grid = Data.Grid;
    		if(!Data.Dragging || !Application.isEditor) Data.Grid = 1;
            else if(!invTex || !Data.BoxBg){
    	
		        Data.BoxBg = new Texture2D(1,1);
		        Data.BoxBg.SetPixel(1,1,Data.BoundColor);
		        Data.BoxBg.Apply();
		        
		        var invColor : Color = Data.BoundColor;
		       	
		        invColor.r = 1 - invColor.r;
	            invColor.g = 1 - invColor.g;
	            invColor.b = 1 - invColor.b;
		        invTex = new Texture2D(1,1);
		        invTex.SetPixel(1,1,invColor);
		        invTex.Apply();
		    }
            
            if(!Application.isEditor) Data.Dragging = false;
            
            if(Data.ShowGrid && Grid > 1 && Application.isEditor){
            
            var hPosition : float = 0;
            
            var width : float = Screen.width;
            var height : float = Screen.height;
            
            while(hPosition<height){
                
                GUI.DrawTexture(Rect(1,hPosition,width,1),Data.BoxBg);
                hPosition +=Grid*Screen.height/Data.Scale.y;
            }
            
            var wPosition : float = 0;
            
            while(wPosition<width){
                
                GUI.DrawTexture(Rect(wPosition,1,1,height),Data.BoxBg);
                wPosition +=Grid*Screen.width/Data.Scale.x;
            }
			}
            
            if(Data.AutoScale) {
                
                GUI.matrix.m00 = Screen.width/Data.Scale.x;
                GUI.matrix.m11 = Screen.height/Data.Scale.y;
            }
	
	MousePosition = Vector2(Input.mousePosition.x/GUI.matrix.m00,(Screen.height-Input.mousePosition.y)/GUI.matrix.m11);
	
	StartDragging();
	var a : Collider;
	for(var page : CreateGUI_Page in Data.Pages){
            
        if(page) if(page.Show && page.Name!=""){
        
        if(page.Skin) GUI.skin = page.Skin;
        
        var elementcount = Data.elements.Length;
        
        
        //This is to get elements in a backwards order for determining dragging so that the top element will be dragged
        
		var BoundStyle = new GUIStyle();
		BoundStyle.normal.background = Data.BoxBg;
        if(Application.isEditor && page.ScrollArea && Data.DrawBounds) GUI.Box(page.ScrollAreaRect,"",BoundStyle);
        
        if(page.ScrollArea){
        	
        	GUILayout.BeginArea(page.ScrollAreaRect);
        	
        	var pageStyle = "Box";
        	if(page.Style.Replace(' ','') != "") pageStyle = page.Style;
            page.ScrollPosition = GUILayout.BeginScrollView(page.ScrollPosition,pageStyle);
            
            if(Data.DrawBounds && Application.isEditor){
            
            	BoundStyle.normal.background = invTex;
				GUI.Box(page.DragAreaRect,"",BoundStyle);
			}
		}
		
        var newText = "";
        
        var bounds : Vector2 = Vector2.zero;
        
        for(var element : CreateGUI_Element in Data.elements){
            
            if(element){
	
                if(element.Page == page.Name && element.Show && element.Name !=""){
                    
                //var orgSkin = new GUISkin(GUI.skin);
                
                bounds.x = Mathf.Max(bounds.x,element.rect.x+element.rect.width);
                bounds.y = Mathf.Max(bounds.y,element.rect.y+element.rect.height);
                
                var StyleExists : boolean = false;
                var Style2Exists : boolean = false;
                
                var style1 : GUIStyle;
              	var style2 : GUIStyle;
                //Look for Style
                if(element.Style.Trim(char.Parse(" ")) != "" && Data.Pages[Data.pageIndex].Skin){
	
                    var Skin : GUISkin = Data.Pages[Data.pageIndex].Skin;
                    for(var style : GUIStyle in Skin.customStyles){
                        if(style.name == element.Style) {
                        	
                        	style1 = new GUIStyle(style);
                            break;
                        }
					}
					
					if(element.Style2.Trim(char.Parse(" ")) != ""){
	                    
	                    for(var style : GUIStyle in Skin.customStyles){
							if(style.name == element.Style2) {
								
								style2 = new GUIStyle(style);
		                        break;
							}
	                	}
					}
                }
				
               	if(Application.isEditor && Data.DrawBounds){
	
					BoundStyle.normal.background = Data.BoxBg;
					GUI.Box(element.rect,"",BoundStyle);
					BoundStyle.normal.background = invTex;
					GUI.Box(Rect(element.DragAreaRect.x+element.rect.x,element.DragAreaRect.y+element.rect.y,element.DragAreaRect.width,element.DragAreaRect.height),"",BoundStyle);
                }

	            var defaultClick : boolean = false;
	            
	            switch (element.Type){
                                
				case GUIType.Button:
                                    
                    if(!style1) style1 = new GUIStyle(GUI.skin.button);
                    
					if(GUI.Button(element.rect,element.Text,style1)) defaultClick = true;
					
                    break;
				
				case GUIType.Tex_Button:
                                    
                    if(!style1) style1 = new GUIStyle(GUI.skin.button);
                    
					if(GUI.Button(element.rect,element.texture,style1)) defaultClick = true;
					
                    break;
				
				case GUIType.TextField:
                                    
                    if(!style1) style1 = new GUIStyle(GUI.skin.textField);
                    
					newText = GUI.TextField(element.rect,element.Text,style1);
					if(element.Editable) element.Text = newText;
					
                    break;
				
				case GUIType.TextArea:
                                    
                    if(!style1) style1 = new GUIStyle(GUI.skin.textArea);
                    
					newText = GUI.TextArea(element.rect,element.Text,style1);
					if(element.Editable) element.Text = newText;
					
					
                    break;
				
				case GUIType.Label:
                                    
                    if(!style1) style1 = new GUIStyle(GUI.skin.label);
                    
					GUI.Label(element.rect,element.Text,style1);
					
                    break;
				
				case GUIType.Password:
					
                    if(!style1) style1 = new GUIStyle(GUI.skin.textField);
                    
					element.Text = GUI.PasswordField(element.rect,element.Text,element.Mask,style1);
					
                    break;
				
				case GUIType.Texture:
                                    
                    if(element.texture){
                        
						GUI.DrawTexture(element.rect,element.texture,element.scaleMode);
                    }
                    break;
				
				case GUIType.H_Slider:
                                    
                    if(!style1) style1 = new GUIStyle(GUI.skin.horizontalSlider);
                    if(!style2) style2 = new GUIStyle(GUI.skin.horizontalSliderThumb);
                    
					element.Slider.x = GUI.HorizontalSlider(element.rect,element.Slider.x,element.Slider.y,element.Slider.z,style1,style2);
					
                    break;
				
				case GUIType.V_Slider:
                                    
                    if(!style1) style1 = new GUIStyle(GUI.skin.verticalSlider);
                    if(!style2) style2 = new GUIStyle(GUI.skin.verticalSliderThumb);
                    
					element.Slider.x = GUI.VerticalSlider(element.rect,element.Slider.x,element.Slider.y,element.Slider.z,style1,style2);
					
                    break;
				
				case GUIType.H_Scroll:
                                    
                    if(!style1) style1 = new GUIStyle(GUI.skin.horizontalScrollbar);
                    
					element.Slider.x = GUI.HorizontalScrollbar(element.rect,element.Slider.x,element.Slider.y,element.Slider.z,element.Slider.w,style1);
					
                    break;
				
				case GUIType.V_Scroll:
                                    
                    if(!style1) style1 = new GUIStyle(GUI.skin.verticalScrollbar);
                    
					element.Slider.x = GUI.VerticalScrollbar(element.rect,element.Slider.x,element.Slider.y,element.Slider.z,element.Slider.w,style1);
					
                    break;
               	}
               	
               	                     
                var tempElementRect = element.rect;
                
                if(page.ScrollArea){
                	
                	tempElementRect.x += page.ScrollAreaRect.x;
                	tempElementRect.y += page.ScrollAreaRect.y;
                }
                
                if(tempElementRect.Contains(MousePosition)) element.MouseOver = true;
                else element.MouseOver = false;
                
                var click : boolean = false;
                            
                var clickMode : ClickMode = page.clickMode;
                            
                if(clickMode) switch(clickMode){
				
					case ClickMode.WhilePressed:
					                     
					       if(Input.GetMouseButton(0)) click = true;
					   break;
									
					case ClickMode.OnUp:
					    if(Input.GetMouseButtonUp(0)) click = true;
					    break;
									
					case ClickMode.OnDown:
					    if(Input.GetMouseButtonDown(0)) click = true;
					    break;
					                
					case ClickMode.Default:
					    click = defaultClick;
					    break;
					case ClickMode.Custom:
						click = CustomClick;
						break;
                }
                
                if(!Data.Dragging && click && element.MouseOver && ReleaseClick) {
                   
                    element.Clicked = true;
                    ReleaseClick = false;
                }
                
                if(!Input.GetMouseButton(0)) ReleaseClick = true;
                
                var elementDragResults = Drag(element.rect,element.DragAreaRect,element.Name,element.Page);
	            
	            element.rect = elementDragResults[0];
	            element.DragAreaRect = elementDragResults[1];
                	//Dragging - end
            	}
        	}
		}
		
        
		
		if(page.ScrollArea){
            
            var pageDragResults = Drag(page.ScrollAreaRect,page.DragAreaRect,"",page.Name);
            
            page.ScrollAreaRect = pageDragResults[0];
            page.DragAreaRect = pageDragResults[1];
            
            var labelStyle : GUIStyle = new GUIStyle();
            
            labelStyle.fixedWidth = bounds.x;
            labelStyle.fixedHeight = bounds.y;
            
            GUILayout.Label("",labelStyle);
            
            GUILayout.EndScrollView();
            GUILayout.EndArea();
		}
		
      }
      
        if(!Input.GetMouseButton(0)){
        
        	ElementLock = "";
        	PageLock = "";
        }
	}
    }
}

enum ClickMode{WhilePressed,OnUp,OnDown,Default,Custom}

function StartDragging(){
	
	for(i = Data.Pages.Length-1; i >= 0; i--){
		
		var page = Data.Pages[i];
		
		if(page)
		for(e = Data.elements.Length-1; e >= 0; e--){
			
			var element = Data.elements[e];
			if(element && element.Page == page.Name && PageLock == ""){
			
				var elementRect = element.rect;
				if(page.ScrollArea) elementRect = Rect(element.rect.x+page.ScrollAreaRect.x,element.rect.y+page.ScrollAreaRect.y,element.rect.width,element.rect.height);
			
				if(Application.isEditor && Data.Dragging && elementRect.Contains(MousePosition) && Input.GetMouseButtonDown(0) || Rect(element.DragAreaRect.x + elementRect.x,element.DragAreaRect.y+elementRect.y,element.DragAreaRect.width,element.DragAreaRect.height).Contains(MousePosition) && (Input.GetMouseButtonDown(0) || CustomClick)){
					
					ElementLock = element.Name;
					PageLock = element.Page;
					MouseStartedDragging = new Vector2(Input.mousePosition.x,Input.mousePosition.y);
		       		StartedDragging = new Vector2(element.rect.x,element.rect.y);
		       		OrgSize = new Vector2(element.rect.width,element.rect.height);
				}
			}
		}
		
		if(page && page.ScrollArea && PageLock == "" && page.Show)
		if(Data.Dragging && page.ScrollAreaRect.Contains(MousePosition) && Input.GetMouseButtonDown(0) || Rect(page.DragAreaRect.x + page.ScrollAreaRect.x,page.DragAreaRect.y+page.ScrollAreaRect.y,page.DragAreaRect.width,page.DragAreaRect.height).Contains(MousePosition) && (Input.GetMouseButtonDown(0) || CustomClick)){
			
			PageLock = page.Name;
			MouseStartedDragging = new Vector2(Input.mousePosition.x,Input.mousePosition.y);
       		StartedDragging = new Vector2(page.ScrollAreaRect.x,page.ScrollAreaRect.y);
       		OrgSize = new Vector2(page.ScrollAreaRect.width,page.ScrollAreaRect.height);
		}
	}
}

function Drag(rect : Rect,dragRect : Rect, elementName : String, pageName : String){
	
	if(PageLock == pageName && ElementLock == elementName){
	    
		if(Input.GetKey(KeyCode.RightShift) && Data.Dragging){
	                             
	         var scaleDirection : int = 0;
	         if(Input.GetKey(KeyCode.DownArrow)||Input.GetKey(KeyCode.RightArrow))  scaleDirection = 1;
	         if(Input.GetKey(KeyCode.UpArrow)||Input.GetKey(KeyCode.LeftArrow))  scaleDirection = -1;
	         
	         var oldWidth = rect.width;
	         rect.width  += Data.ResizeFactor*Grid/10*Time.deltaTime*100*scaleDirection;
	         rect.height *= rect.width/oldWidth;
	         
	    }else if(Data.Dragging){
	    
	        if(Input.GetKey(KeyCode.UpArrow)) OrgSize.y -=Data.ResizeFactor*Grid/10*Time.deltaTime*100;
	        if(Input.GetKey(KeyCode.DownArrow)) OrgSize.y +=Data.ResizeFactor*Grid/10*Time.deltaTime*100;
	        if(Input.GetKey(KeyCode.LeftArrow)) OrgSize.x -= Data.ResizeFactor*Grid/10*Time.deltaTime*100;
	        if(Input.GetKey(KeyCode.RightArrow)) OrgSize.x += Data.ResizeFactor*Grid/10*Time.deltaTime*100;
	        
		    if(Input.GetKey(KeyCode.RightArrow)|| Input.GetKey(KeyCode.LeftArrow)||Input.GetKey(KeyCode.DownArrow)||Input.GetKey(KeyCode.UpArrow)){
		   		
		   		rect.width = Mathf.Max(Mathf.RoundToInt(OrgSize.x/Grid)*Grid,0);
		    	rect.height = Mathf.Max(Mathf.RoundToInt(OrgSize.y/Grid)*Grid,0);
		    }
	    }
	   	
	   	var scaling :Vector2 = Vector2(1,1);
	   	if(Data.AutoScale) scaling = Vector2(Data.Scale.x/Screen.width,Data.Scale.y/Screen.height);
	   	
	    rect.x = StartedDragging.x+(Input.mousePosition.x - MouseStartedDragging.x)*(scaling.x);
	    rect.y = StartedDragging.y-(Input.mousePosition.y - MouseStartedDragging.y)*(scaling.y);
	        
	    if(Grid > 1){
	    
	        rect.x = Mathf.RoundToInt(rect.x/Grid)*Grid;
	        rect.y = Mathf.RoundToInt(rect.y/Grid)*Grid;
	    }
	    
	    if(!Data.Dragging){
	    
	    	if(rect.x + dragRect.x < 0) rect.x = -dragRect.x;
	    	if(rect.y + dragRect.y < 0) rect.y = -dragRect.y;
	    	
	    	var screen : Vector2 = Vector2(Data.Scale.x,Data.Scale.y);
	    	if(!Data.AutoScale) screen = Vector2(Screen.width,Screen.height);
	    	
	    	if(Data.Scale.x < rect.x+dragRect.x+dragRect.width) rect.x = screen.x - (dragRect.x + dragRect.width);
	    	if(Data.Scale.y < rect.y+dragRect.y+dragRect.height) rect.y = screen.y - (dragRect.y + dragRect.height);
		}
	}
	
	return [rect,dragRect];
}

function GetElement(name : String,page : String){
  
    if(DataHolder.Data.elements){
        
        for(var element : CreateGUI_Element in DataHolder.Data.elements){
            
            if(element)
                if(element.Name.ToLower() == name.ToLower() && element.Page == page) return element;
        }
    }
    return null;
}

function GetElement(name : String){
    
    if(CheckTargetPage()) return GetElement(name,TargetPage);
    return null;
}

function GetValue(name : String,page : String){
    
    var element : CreateGUI_Element	= GetElement(name,page);
    
    if(element) return element.Slider.x;
    Debug.LogError("Element \""+name+"\" was not found.");
    return null;
}

function GetValue(name : String){
    
    if(CheckTargetPage()) return GetValue(name,TargetPage);
    return null;
}

function GetPage(page : String){
    
    if(DataHolder.Data.Pages){
        
        for(var Page : CreateGUI_Page in DataHolder.Data.Pages){
            
            if(Page)
                if(Page.Name.ToLower() == page.ToLower()) return Page;
        }
        Debug.LogError("Page \""+page+"\" was not found.");
    }
    return null;
}

function DeletePage(name : String){
    
    GetPage(name).Name = "";
    RefreshPageList();
}

function DeleteElement(name : String,page :String){
    
    var success = false;
    
    var target = GetElement(name,page);
    if(target && target.Name){
        target.Name ="";
        success = true;
    }
    RefreshElementList();
    return success;
}

function DeleteElement(name : String){
    
    if(CheckTargetPage()) return DeleteElement(name,TargetPage);
    return null;
}

function WasClicked(name : String,page : String){
    
    var element : CreateGUI_Element	= GetElement(name,page);
    
    if(element)
	if(GetElement(name,page).Clicked){
            
       element.Clicked =false;
       return true;
	}
    
    return false;
}

function WasClicked(name : String){
    
    if(CheckTargetPage()) return WasClicked(name,TargetPage);
    return null;
}

function SwitchToPage(name : String){
    
    var found : boolean = false;
    
    if(DataHolder.Data.Pages){
        
        for(var Page : CreateGUI_Page in DataHolder.Data.Pages){
            
            if(Page)
                if(Page.Name != name) Page.Show = false;
            else {
                found = true;
                Page.Show = true;
            }
        }
        if(!found) Debug.LogError("Page \""+name+"\" was not found.");
    }
}

enum GUIType{Button,Tex_Button,TextField,TextArea,Label,Password,Texture,H_Slider,V_Slider,H_Scroll,V_Scroll}

public class CreateGUI_Element{
    
    var Name : String = "";
    var Text : String = "Text";
    var Page : String = "";
    var Clicked : boolean = false;
    var MouseOver : boolean = false;
    var Style : String = "";
    var Style2 : String = "";
    var Show : boolean = true;
    var Type : GUIType = GUIType.Button;
    var rect : Rect = Rect(0,0,100,20);
    var scaleMode : ScaleMode = ScaleMode.StretchToFill;
    var Mask : char = char.Parse("*");
    var DrawnOut : boolean = true;
    var Slider : Vector4 = new Vector4(0,0,10,3);
    var texture : Texture2D;
    var Editable : boolean = true;
    var DragAreaRect : Rect = Rect(0,0,0,0);
    
    function Clone(){
        
        var element = this;
        
        var newElement = new CreateGUI_Element();
        
        newElement.Name = element.Name;
        newElement.Text = element.Text;
        newElement.Page = element.Page;
        newElement.Clicked = element.Clicked;
        newElement.MouseOver = element.MouseOver;
        newElement.Style  = element.Style;
        newElement.Style2  = element.Style2;
        newElement.Show = element.Show;
        newElement.Type = element.Type;
        newElement.rect = element.rect;
        newElement.scaleMode = element.scaleMode;
        newElement.Mask = element.Mask;
        newElement.DrawnOut = element.DrawnOut;
        newElement.Slider = element.Slider;
        newElement.texture = element.texture;
        
        return newElement;
    }
}

function RefreshElementList(){
    
    if(!Data.elements) Data.elements = new CreateGUI_Element[3];
    
    var elementcount = 0;
    for(var element : CreateGUI_Element in Data.elements){
        if(element)if(element.Name!="") elementcount++;
    }
    var tempelements : CreateGUI_Element[] = new CreateGUI_Element[elementcount+2];
    elementcount = 1;
    for(var element : CreateGUI_Element in Data.elements){
        if(element)
            if(element.Name!=""){
                tempelements[elementcount] = element;
                elementcount++;
            }
    }
    Data.elements = tempelements;
}

function CheckTargetPage(){
    
    if(TargetPage == ""){
        Debug.LogWarning("CreateGUI_Main.TargetPage is \"\"");
        return false;
    }
    
    return true;
}

function AddElement(name : String){
    
    if(CheckTargetPage()) AddElement(name,TargetPage);
}

function AddElement(name : String,page :String){
    
    RefreshElementList();
    
    var ok : boolean = true;
    for (var element : CreateGUI_Element in Data.elements){
	if(element && element.Name == name && element.Page == page){
            ok = false;
            if(name.Trim(char.Parse(" ")) != "")Debug.LogWarning("An element with that name already exists!");
	}
	
    }
    
    if(name.Trim(char.Parse(" ")) == ""){
        ok = false;
        Debug.LogWarning("Please enter a name for the new element!");
    }
    var numberofelements : int = 1;
    for(var element : CreateGUI_Element in Data.elements){
        if(element)if(element.Name!="") numberofelements++;
    }
    
    if(ok){	
        Data.elements[numberofelements] = new CreateGUI_Element();
        var New = Data.elements[numberofelements];
        New.Name = name;
        New.Text = name;
        New.Page = page;
        New.rect.width = Screen.width/3;
        New.rect.height = Screen.height/5;
        
        return Data.elements[numberofelements];
    }
    return null;
}

function AddElement(newelement : CreateGUI_Element,name : String){
    
    RefreshElementList();
    
    var ok : boolean = true;
    
    if(name.Trim(char.Parse(" ")) != ""){
	
	for(var element : CreateGUI_Element in Data.elements){
            if(element && element.Name == name && element.Page == newelement.Page){
                
                ok = false;
                Debug.LogWarning("An element with that name already exists!");
                break;
            }
        }
        
        var numberofelements : int = 1;
        for(var element : CreateGUI_Element in Data.elements){
            if(element)if(element.Name!="") numberofelements++;
        }
        
	if(ok){	
            Data.elements[numberofelements] = newelement;
            Data.elements[numberofelements].Name = name;
            return Data.elements[numberofelements];
	}
        
    }else Debug.LogWarning("Please enter a name for the new element!");
    return null;
}

function AddPage(name : String){
    
    RefreshPageList();
    
    var ok : boolean = true;
    for (var page : CreateGUI_Page in Data.Pages){
        if(page && page.Name == name){
            ok = false;
        }
    }
    
    if(name.Trim(char.Parse(" ")) == ""){
        ok = false;
        Debug.LogWarning("Please enter a name!");
    }else if(!ok) Debug.LogWarning("A page with that name already exists!");
    
    if(ok){
        Data.pageIndex++;
        var numofpages : int = 0;
        for(var page : CreateGUI_Page in Data.Pages){
            if(page) if(page.Name!="") numofpages++;
        }
        Data.Pages[numofpages] = new CreateGUI_Page();
        Data.Pages[numofpages].Name = name;
        Data.Pages[numofpages].clickMode = ClickMode.OnUp;
        return Data.Pages[numofpages];
    }
    return null;
}

function RefreshPageList(){
    
    if(!Data.Pages) Data.Pages = new CreateGUI_Page[3];
    
    var pagecount = 0;
    for(var page : CreateGUI_Page in Data.Pages){
        if(page)if(page.Name!="") pagecount++;
    }
    
    var tempPages : CreateGUI_Page[] = new CreateGUI_Page[pagecount+1];
    pagecount = 0;
    for(var page : CreateGUI_Page in Data.Pages){
        if(page)
            if(page.Name!=""){
                tempPages[pagecount] = page;
                pagecount++;
            }
    }
    Data.Pages = tempPages;
}

public class CreateGUI_Page{
    
    var Name : String = "";
    var Show : boolean = true;
    var Empty : boolean = true;
    var Skin : GUISkin;
    var Style : String = "";
    var clickMode : ClickMode = ClickMode.Default;
    var ScrollArea : boolean = false;
    var ScrollAreaRect : Rect = Rect(100,100,100,100);
    var ScrollPosition : Vector2 = Vector2(0,0);
    var DragAreaRect : Rect = Rect(0,0,0,0);
    
    function Clone(){
        
        var clone : CreateGUI_Page = new CreateGUI_Page();
        
        clone.Style = Style;
        clone.Name = Name;
        clone.Show = Show;
        clone.Empty = Empty;
        clone.Skin = Skin;
        clone.clickMode = clickMode;
        clone.ScrollArea = ScrollArea;
        clone.ScrollAreaRect = ScrollAreaRect;
        clone.ScrollPosition = ScrollPosition;
        clone.DragAreaRect = DragAreaRect;
        
        return clone;
    }
}

public class CreateGUI_Data extends Object{
    
    var pageIndex : int = 0;
    var DeleteChoice : boolean = false;
    var Advanced : boolean = false;
    var AutoScale : boolean = true;
    var HideUnselectedPages = false;
    
    var NewName : String = "";
    var elements : CreateGUI_Element[];
    var Pages : CreateGUI_Page[];
    var Scale : Vector2 = new Vector2(1280,1024);
    var GridMax : int = 100;
    var Grid : float = 1;
    var BoxBg : Texture2D;
    var BoundColor : Color = Color(1,0,0,.3);
    var DrawBounds : boolean = false;
    var Dragging : boolean = true;
    var ResizeFactor : float = 3;
    var ShowGrid : boolean = true;
    
    function Clone(){
        
        var clone : CreateGUI_Data = new CreateGUI_Data();
        
        if(elements) clone.elements = new CreateGUI_Element[elements.Length];
        if(Pages) clone.Pages = new CreateGUI_Page[Pages.Length];
        clone.Scale = Scale;
        clone.GridMax = GridMax;
        clone.Grid = Grid;
        clone.BoxBg = BoxBg;
        clone.BoundColor = BoundColor;
        clone.DrawBounds = DrawBounds;
        clone.Dragging = Dragging;
        clone.ResizeFactor = ResizeFactor;
        clone.ShowGrid = ShowGrid;
        clone.HideUnselectedPages = HideUnselectedPages;
        
        var elementcount : int = clone.elements.Length;
        
        while(elementcount > 0){
            
            elementcount--;
            if(elements[elementcount])
                clone.elements[elementcount] = elements[elementcount].Clone();
        }
        
        var pagecount : int = Pages.Length;
        
        while(pagecount > 0){
            
            pagecount--;
            if(Pages[pagecount])
                clone.Pages[pagecount] = Pages[pagecount].Clone();
        }
        return clone;
    }
}

@script ExecuteInEditMode