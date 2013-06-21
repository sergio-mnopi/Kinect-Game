@CustomEditor(CreateGUI_Main)
class CreateGUI_Interface extends Editor {
 
	var pagecount : int = 0;
	var OldIndex : int = 0;
	var Data : CreateGUI_Data;

override function OnInspectorGUI(){
		
		var main = target as CreateGUI_Main;
		main.Interface = this;
		
		if(!main.DataHolder){
			
			main.DataHolder = EditorGUILayout.ObjectField("Data File:",main.DataHolder,CreateGUI_DataHolder,true);
			
		}else{
		
		main.Data = main.DataHolder.Data;
		
		EditorUtility.SetDirty(main.DataHolder);
		
		Data = main.DataHolder.Data;
		if(!Data.elements) main.RefreshElementList();
		if(!Data.Pages) main.RefreshPageList();
		
		for(var element : CreateGUI_Element in Data.elements){
			
			if(element) element.Clicked = false;
		}
		
		GUILayout.Space(12);
		
		//Page Selection, Add Page, Add Element
		
		var pageindexcount : int = 0;
		for(var apage : CreateGUI_Page in Data.Pages){
			
			if(apage && apage.Name != ""){
				pageindexcount++;
			}
		}
		var PageList : String[] =  new String[pageindexcount];
		
		pageindexcount = 0;
		
		for(var apage : CreateGUI_Page in Data.Pages){
			
			if(apage && apage.Name != ""){
				PageList[pageindexcount] = apage.Name;
				pageindexcount++;
			}
		}
		
		EditorGUILayout.BeginHorizontal();
		EditorGUILayout.BeginVertical();
		
		if(OldIndex != Data.pageIndex){
		OldIndex = Data.pageIndex;
		
		if(Data.Dragging && Data.HideUnselectedPages)
		for(var page : CreateGUI_Page in Data.Pages){
			
			if(page){
			if(page.Name == PageList[Data.pageIndex]) page.Show = true;
			else page.Show = false;
			}
		}
		}
		
		if(pageindexcount > 0) {
			
			GUILayout.BeginHorizontal();
			Data.pageIndex = EditorGUILayout.Popup(Data.pageIndex,PageList);
		
			if(GUILayout.Button("X", "minibutton")){
				
				Data.DeleteChoice = !Data.DeleteChoice;
			}
			GUILayout.EndHorizontal();
		}
		
		if(Data.DeleteChoice){
			
			EditorGUILayout.BeginHorizontal();
				main.RefreshPageList();
				GUILayout.Label(" Delete Page? ","ErrorLabel");
				if(GUILayout.Button("Yes","minibuttonleft")){
					for(var element : CreateGUI_Element in Data.elements){
						if(element.Page == Data.Pages[Data.pageIndex].Name) element.Name = "";
					}
					for(var page : CreateGUI_Page in Data.Pages){
						if(page.Name == PageList[Data.pageIndex]) {page.Name = "";
							break;
						}
					}
					Data.pageIndex--;
					Data.DeleteChoice = false;
				}
				if(GUILayout.Button("No","minibuttonright")){
					Data.DeleteChoice = false;
				}
			EditorGUILayout.EndHorizontal();
		}
		
		EditorGUILayout.EndVertical();
		GUILayout.FlexibleSpace();
		
		var EditOrTest : int = 1;
		
		if(Data.Dragging) EditOrTest = 0;
		var OldChoice : boolean = Data.Dragging;
		
		GUILayout.FlexibleSpace();
		main.RefreshPageList();
		
		EditorGUILayout.BeginVertical();
		main.Data.NewName = EditorGUILayout.TextField(main.Data.NewName);
		
		EditorGUILayout.BeginHorizontal();
		if(Data.pageIndex < PageList.Length)
		if(GUILayout.Button("Rename Page", "minibutton")){
			
				var oldPageName : String = PageList[Data.pageIndex];
				var newPageName : String = main.Data.NewName+"";
			
				if(newPageName.Trim(char.Parse(" ")) == "" || oldPageName.Trim(char.Parse(" ")) == ""){
					
					Debug.LogWarning("Please enter the name of an existing page or element and a new name for it.");
				}else{
				var targetpage : CreateGUI_Page;
				var nametaken : boolean = false;
				for(var page : CreateGUI_Page in Data.Pages){
					
					if(page){
					if(page.Name== newPageName+""){
						
						nametaken = true;
					}
					if(page.Name == oldPageName+""){
						targetpage = page;
					}
					}
				}
				
				if(!targetpage){
					Debug.LogWarning("A page with the name \""+oldPageName+"\" couldn't be found.");
				}
				
				if(nametaken){
					Debug.LogWarning("Another page already has the name \""+newPageName+"\".");
				}
				
				if(!nametaken && targetpage){
					
					for(var element : CreateGUI_Element in Data.elements){
						
						if(element && element.Page == targetpage.Name) {element.Page = newPageName;
						
							
							Debug.Log(element.Name+"  "+element.Page);
							renamedPage = true;
						}
						
					}
					targetpage.Name = newPageName;
					
					Debug.Log("Page \""+oldPageName+"\" has been renamed to \""+newPageName+"\".");
				}
				}
			}
		
		var Page : CreateGUI_Page;
		
		try{
		 Page = Data.Pages[Data.pageIndex];
		
		}catch (IndexOutOfRangeException){
		
			Data.pageIndex = 0;
		}
		
		var addPageStyle = "minibutton";
		if(Page) addPageStyle = "minibuttonleft";
		
		if(GUILayout.Button("Add Page",addPageStyle)){
			
			var skin : GUISkin;
			if(Page) skin = Page.Skin;
			var pagecount = PageList.Length;
			if(main.AddPage(main.Data.NewName)) Data.pageIndex = PageList.Length;
			if(skin) Data.Pages[Data.pageIndex].Skin = skin;
		}
		
		if(pageindexcount > 0)
			if(GUILayout.Button("Add Element", "minibuttonright")){
				
				main.AddElement(main.Data.NewName,Page.Name);	
				
			}
		EditorGUILayout.EndHorizontal();
		
		EditorGUILayout.EndVertical();
		
		EditorGUILayout.EndHorizontal();
		
		if(Page){
		if(!Data.HideUnselectedPages) Page.Show = EditorGUILayout.Toggle("Page Visible:",Page.Show);
		//List of Elements
		var GotElements : boolean = false;
		for(var element : CreateGUI_Element in Data.elements){
				if(element) if(element.Page == Page.Name && element.Name!="") GotElements = true;
		}
		GUILayout.Space(10);
		GUILayout.BeginVertical("sv_iconselector_labelselection");
		GUILayout.BeginHorizontal();
		
		Data.Dragging = (GUILayout.Toolbar(EditOrTest,["Edit Mode","Test Mode"]) == 0);
		if(Data.Dragging != OldChoice){
		
			if(Data.Dragging){					
				main.DataHolder.Data = main.DataHolder.Backup.Clone();
				main.DataHolder.Data.Dragging = true;
				main.DataHolder.Data.pageIndex = main.DataHolder.Backup.pageIndex;
			}else{
				main.DataHolder.Backup = Data.Clone();
				Data.ShowGrid = false;
				Data.DrawBounds = false;
				main.Grid =1;
				main.DataHolder.Backup.pageIndex = main.DataHolder.Data.pageIndex;
			}
			main.DataHolder.Data.Dragging = !OldChoice;
		}
		Data.ShowGrid = EditorGUILayout.Toggle(" Show Grid:",Data.ShowGrid);
		Data.DrawBounds = EditorGUILayout.Toggle(" Draw Bounds:",Data.DrawBounds);
		GUILayout.EndHorizontal();
		
		GUILayout.Space(4);
		if(GUILayout.Button("  Advanced Options","GV Gizmo DropDown")) Data.Advanced = !Data.Advanced;
		if(Data.Advanced){
			if(Page) {
				GUILayout.BeginVertical("GroupBox");
				Page.Skin = EditorGUILayout.ObjectField("Page Skin:",Page.Skin,GUISkin,true);
				Page.clickMode = EditorGUILayout.EnumPopup("Page ClickMode:",Page.clickMode);
				var HideUnselectedPages_Old = Data.HideUnselectedPages;
				if(Data.Dragging) Data.HideUnselectedPages = EditorGUILayout.Toggle("Hide Unselected:",Data.HideUnselectedPages);
				
				if(HideUnselectedPages_Old != Data.HideUnselectedPages && Data.HideUnselectedPages)
				for(var page : CreateGUI_Page in Data.Pages){
			
					if(page){
					if(page.Name == PageList[Data.pageIndex]) page.Show = true;
					else page.Show = false;
					}
				}
				GUILayout.EndVertical();
			}
			GUILayout.BeginVertical("GroupBox");
			main.DataHolder = EditorGUILayout.ObjectField("Data File:",main.DataHolder,CreateGUI_DataHolder,true);
			GUILayout.EndVertical();
			
			EditorGUILayout.BeginVertical("GroupBox");
			EditorGUILayout.BeginHorizontal();
			Data.Grid = EditorGUILayout.Slider("Grid Size:",Data.Grid,1,Data.GridMax);
			Data.ResizeFactor = EditorGUILayout.FloatField("Resize Speed:",Data.ResizeFactor);
			EditorGUILayout.EndHorizontal();
			GUILayout.Space(4);
			EditorGUILayout.BeginHorizontal();
			GUILayout.Label("Color:");
			var oldColor : Color = Data.BoundColor;
			Data.BoundColor = EditorGUILayout.ColorField(Data.BoundColor);
			if(Data.BoundColor!=oldColor) Data.BoxBg = null;
			EditorGUILayout.EndHorizontal();
			EditorGUILayout.EndVertical();
			
			GUILayout.BeginVertical("GroupBox");
			main.Data.AutoScale = EditorGUILayout.Toggle("Auto Scale:",main.Data.AutoScale);
			if(main.Data.AutoScale){
				Data.Scale = EditorGUILayout.Vector2Field("Native Resolution:",Data.Scale);
				EditorGUILayout.SelectableLabel("Current: "+main.ScreenRes);
			}
			GUILayout.EndVertical();
		}
		GUILayout.EndVertical();
		
		GUILayout.Label("");
		
		
		if(Page && Page.Name!=""){
		
			GUILayout.BeginVertical("sv_iconselector_labelselection");
			
			GUILayout.BeginHorizontal();
			GUILayout.Label("Use Page as a Scroll Area");
			Page.ScrollArea = EditorGUILayout.Toggle(Page.ScrollArea);
			GUILayout.FlexibleSpace();
			
			if(Page.Skin && Page.ScrollArea){
			
				var PageStyleList : String[] = new String[Page.Skin.customStyles.Length+1];
				var Pagestylecount : int = 0;
				var SelectedPageStyle : int = 0;
							
				PageStyleList[Pagestylecount] = " ";
				for(var customstyle1 : GUIStyle in Page.Skin.customStyles){
					Pagestylecount++;
					if(customstyle1.name == Page.Style) SelectedPageStyle = Pagestylecount;
					PageStyleList[Pagestylecount] = customstyle1.name;
				}
				GUILayout.Label("Style:");
				var PageStyleSelected : int = EditorGUILayout.Popup(SelectedPageStyle,PageStyleList);
				Page.Style = PageStyleList[PageStyleSelected];
			}
			
			GUILayout.EndHorizontal();
			if(Page.ScrollArea){
			
				GUILayout.BeginHorizontal();
				Page.ScrollAreaRect = EditorGUILayout.RectField("Rect:",Page.ScrollAreaRect);
				Page.ScrollPosition = EditorGUILayout.Vector2Field("Scroll Pos:",Page.ScrollPosition);
				var DragOff = "";
				if(Page.DragAreaRect == Rect(0,0,0,0)) DragOff = "-Disabled ";
				GUILayout.BeginVertical();
				GUILayout.Label("Draggable In Game"+DragOff+"(Inverted Color):");
				var oldDragArea = Page.DragAreaRect;
				Page.DragAreaRect = EditorGUILayout.RectField("Rect:",Page.DragAreaRect);
				if(oldDragArea!=Page.DragAreaRect){
					Page.DragAreaRect.x = Mathf.Max(0,Page.DragAreaRect.x);
					Page.DragAreaRect.y = Mathf.Max(0,Page.DragAreaRect.y);
					if(Page.DragAreaRect.width+Page.DragAreaRect.x > Page.ScrollAreaRect.width) Page.DragAreaRect.width = Page.ScrollAreaRect.width - Page.DragAreaRect.x;
					if(Page.DragAreaRect.height+Page.DragAreaRect.y > Page.ScrollAreaRect.height) Page.DragAreaRect.height = Page.ScrollAreaRect.height - Page.DragAreaRect.y;
					Data.DrawBounds = true;
				}
				GUILayout.EndVertical();
				GUILayout.FlexibleSpace();
				GUILayout.EndHorizontal();
			}
			GUILayout.EndVertical();
		}
		
		GUILayout.Space(10);
		if(Page.Name != ""){
		GUILayout.Label("Elements on Page \""+Page.Name+"\"");
		
		EditorGUILayout.BeginHorizontal();
		if(GotElements){ 
			if(GUILayout.Button("Hide All Details")){
			for(var element : CreateGUI_Element in Data.elements){
				if(element)
				if(element.Page == Page.Name) element.DrawnOut = false;
			}
		}
		GUILayout.FlexibleSpace();
		if(GUILayout.Button("Show All", "minibuttonleft")){
			for(var element : CreateGUI_Element in Data.elements){
				if(element)
				if(element.Page == Page.Name) element.Show = true;
			}
		}
			if(GUILayout.Button("Hide All", "minibuttonright")){
				for(var element : CreateGUI_Element in Data.elements){
					if(element)
					if(element.Page == Page.Name)  element.Show = false;
				}
			}
		}
		
		EditorGUILayout.EndHorizontal();
		
		if(Data.Dragging && Data.HideUnselectedPages) Page.Show = true;
		
		GUILayout.Space(10);
		for(var element : CreateGUI_Element in Data.elements){
			
			if(element)
			if(element.Name != "" && element.Page == Page.Name){
				
				var areaStyle : String = "HelpBox";
				if(!element.Show) areaStyle = "PopupCurveSwatchBackground";
				
				GUILayout.BeginVertical(areaStyle);
				GUILayout.Space(5);
			
				EditorGUILayout.BeginHorizontal();
				GUILayout.Space(5);
				var DrawoutStyle : String = "OL Plus";
				if(element.DrawnOut) DrawoutStyle = "OL Minus";
				if(GUILayout.Button(" ",DrawoutStyle)) element.DrawnOut = !element.DrawnOut;
				
				EditorGUILayout.BeginVertical();
				EditorGUILayout.BeginHorizontal();
				var elementLabelStyle = "HeaderLabel";
				if(element.Show) elementLabelStyle = "BoldLabel";
				GUILayout.Label(element.Type+" \""+element.Name+"\"",elementLabelStyle);
				GUILayout.FlexibleSpace();
				if(GUILayout.Button("Copy","minibuttonleft")){
					
					var Letters : char[] = element.Name.ToCharArray();
					var CopyNumber : String = "";
					var CopyName : String = element.Name;
					
					for(var achar : char in Letters){
						
						if(char.IsNumber(achar)){
							CopyNumber+= achar;
						}
					}
					
					if(CopyNumber!= ""){
					
					var NumArray : char[] = CopyNumber.ToCharArray();
					var count : int = NumArray.Length;
					
					while(count>0){
						count--;
						CopyName = CopyName.TrimEnd(NumArray[count]);
					}
					
					var UniqueName : boolean = false;
					var AddNumber : int = int.Parse(CopyNumber);
					
					while(!UniqueName){
					UniqueName = true;
					for(var element : CreateGUI_Element in Data.elements){
						
						if(element) if(element.Name == CopyName+AddNumber){
							AddNumber++;
							UniqueName = false;
						}
					}
					}
					CopyName += AddNumber+"";
					
					}else{
						CopyName+="0";
					}
					
					var numberofelements1 : int = 1;
					for(var element : CreateGUI_Element in Data.elements){
						if(element)if(element.Name!="") numberofelements1++;
					}
					main.RefreshElementList();
					
					Data.elements[numberofelements1] = new CreateGUI_Element();
					Data.elements[numberofelements1] = element.Clone();
					Data.elements[numberofelements1].Name = CopyName;
					if(Data.elements[numberofelements1].Text == element.Name) Data.elements[numberofelements1].Text = CopyName;
					
				}
				if(GUILayout.Button("Delete","minibuttonright")){
					element.Name = "";
				}
				EditorGUILayout.EndHorizontal();
				GUILayout.Space(10);
				if(element.DrawnOut){
					
					EditorGUILayout.BeginHorizontal();
					GUILayout.Label("Name:");
					var inputname = EditorGUILayout.TextField(element.Name);
					
					if(inputname!= element.Name){
						
						RenameElement(inputname.Trim(char.Parse(" ")),element.Name,element.Page);
					}
					
					if(element.Type == GUIType.TextArea || element.Type == GUIType.Label){
						GUILayout.Label("Text:");
						element.Text = EditorGUILayout.TextArea(element.Text);
					}else if(element.Type == GUIType.Texture || element.Type == GUIType.Tex_Button){
						element.texture = EditorGUILayout.ObjectField("Texture:",element.texture,Texture2D,true);
					}else if(element.Type == GUIType.H_Slider|| element.Type == GUIType.V_Slider || element.Type == GUIType.H_Scroll|| element.Type == GUIType.V_Scroll){
					
						EditorGUILayout.BeginVertical();
						element.Slider.x =EditorGUILayout.FloatField("Value:",element.Slider.x);
						element.Slider.y =EditorGUILayout.FloatField("Bound1:",element.Slider.y);
						element.Slider.z =EditorGUILayout.FloatField("Bound2",element.Slider.z);
						if(element.Type == GUIType.H_Scroll|| element.Type == GUIType.V_Scroll){
							element.Slider.w =EditorGUILayout.FloatField("Bar Size:",element.Slider.w);
						}
						EditorGUILayout.EndVertical();
					}else{
						GUILayout.Label("Text:");
						element.Text = EditorGUILayout.TextField(element.Text);
						if(element.Type == GUIType.Password){
						GUILayout.FlexibleSpace();
							GUILayout.Label("Mask:");
							element.Mask = GUILayout.TextField(element.Mask+"").Trim(char.Parse(" ")).ToCharArray()[0];
						}
					}
					EditorGUILayout.EndHorizontal();
					EditorGUILayout.BeginHorizontal();
					GUILayout.Label("Page:");
					try{
					var switchToPage = PageList[EditorGUILayout.Popup(Data.pageIndex,PageList)];
					}catch(e : System.IndexOutOfRangeException){};
					
		
					if(switchToPage!=Page.Name)
					if(main.GetElement(element.Name,switchToPage)) Debug.LogError("There is already an Element with the same Name on that Page");
					
					element.Type = EditorGUILayout.EnumPopup(element.Type);
					
					if(element.Type == GUIType.Texture){
						element.scaleMode = EditorGUILayout.EnumPopup(element.scaleMode);
					}else if(Page.Skin){
						
						GUILayout.FlexibleSpace();
						var Skin :GUISkin = Page.Skin;
						if(Skin.customStyles){
						
						var StyleList : String[] = new String[Skin.customStyles.Length+1];
						var stylecount : int = 0;
						var SelectedStyle : int = 0;
						var SelectedStyle2 : int = 0;
						
						StyleList[stylecount] = " ";
						for(var customstyle : GUIStyle in Skin.customStyles){
							stylecount++;
							if(customstyle.name == element.Style) SelectedStyle = stylecount;
							if(customstyle.name == element.Style2) SelectedStyle2 = stylecount;
							StyleList[stylecount] = customstyle.name;
						}
						EditorGUILayout.BeginVertical();
						EditorGUILayout.BeginHorizontal();
						GUILayout.Label("Style:");
						var StyleSelected : int = EditorGUILayout.Popup(SelectedStyle,StyleList);
						element.Style = StyleList[StyleSelected];
						EditorGUILayout.EndHorizontal();
						
						
						if(element.Type == GUIType.H_Slider|| element.Type == GUIType.V_Slider){
						EditorGUILayout.BeginHorizontal();
						GUILayout.Label("Style2:");
						var StyleSelected2 : int = EditorGUILayout.Popup(SelectedStyle2,StyleList);
						element.Style2 = StyleList[StyleSelected2];
						EditorGUILayout.EndHorizontal();
						}
						
						EditorGUILayout.EndVertical();
						}
					}
		
					
					EditorGUILayout.EndHorizontal();
					
					EditorGUILayout.BeginHorizontal();
					
					EditorGUILayout.BeginVertical();
					var ShowHideText : String = "Show";
					if(element.Show) ShowHideText = "Hide";
					if(GUILayout.Button(ShowHideText, "minibutton")) element.Show = !element.Show;
					if(GUILayout.Button("Bring Top", "minibutton")){
						
						Data.elements[0] = element.Clone();
						element.Name = "";
						main.RefreshElementList();
					}
					EditorGUILayout.EndVertical();
					
					GUILayout.BeginVertical();
					GUILayout.Label("Drag Area Rect:");
					element.DragAreaRect = EditorGUILayout.RectField(element.DragAreaRect);
					GUILayout.EndVertical();
					GUILayout.BeginVertical();
					GUILayout.Label("Element Rect:");
					element.rect = EditorGUILayout.RectField(element.rect);
					GUILayout.EndVertical();
					EditorGUILayout.EndHorizontal();
					
					if(element.Type == GUIType.TextField || element.Type == GUIType.TextArea) element.Editable = EditorGUILayout.Toggle("Editable:",element.Editable);
					GUILayout.Space(10);
					
				}
				
				EditorGUILayout.EndVertical();
				
				EditorGUILayout.EndHorizontal();
				
				GUILayout.EndVertical();
		
			}
		}
		
		
		}
		}
			GUILayout.FlexibleSpace();
		}
	}
}

function RenameElement(New : String, Old : String,Page : String){

	if(New.Trim(char.Parse(" ")) == "" || Old.Trim(char.Parse(" ")) == ""){
					
					Debug.LogWarning("Please enter the name of an existing page or element and a new name for it.");
	}else{
				var targetelement : CreateGUI_Element;
				var nametaken : boolean = false;
				for(var element : CreateGUI_Element in Data.elements){
					
					if(element)
					if(element.Page == Page){
						if(element.Name== New &&  New != Old){
							
							nametaken = true;
						}
						if(element.Name == Old){
							targetelement = element;
						}
					}
				}
				
				if(!targetelement){
					Debug.LogWarning("An element with the name \""+Old+"\" couldn't be found on this page.");
				}
				
				if(nametaken){
					Debug.LogWarning("Another element on this page already has the name \""+New+"\".");
				}
				
				if(!nametaken && targetelement){
					
					targetelement.Name = New;
					return true;
				}
				
				return false;
				}
}

var renamedPage = false;
var checkcount = 0;