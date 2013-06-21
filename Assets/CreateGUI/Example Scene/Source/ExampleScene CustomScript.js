#pragma strict
var main : CreateGUI_Main;
var Inventory : int = 1;
var CubeTexture : Texture2D;
var Cube : GameObject;
var wonGame = false;

function Update () {
	
	if(main.WasClicked("OK","MessageBox")){
		
		if(wonGame) {
		
			Application.LoadLevel(Application.loadedLevel);
			main.GetElement("Text","MessageBox").Text = "Get out of the red Box by using \"Q\" and \"E\" to pick up and to drop Cubes";
			main.GetElement("OK","MessageBox").Text = "OK";
			
		}
		else{
			main.GetPage("MessageBox").Show = false;
			main.GetPage("Inventory").Show = true;
		}
	}
	
	if(Input.GetKeyDown(KeyCode.Q)){
	
		var hit : RaycastHit;
		if(Physics.Raycast (transform.position, transform.forward,hit, 5) && hit.transform.name == "Cube"){
			
			Destroy(hit.transform.gameObject);
			if(Inventory < 8){
				//GetElement(ElementName,PageName);
				main.GetElement("Slot"+Inventory,"Inventory").texture = CubeTexture;
				Inventory++;
			}
		}
	}

	if(Input.GetKeyDown(KeyCode.E) && Inventory > 0){
	
		Inventory--;
		main.GetElement("Slot"+Inventory,"Inventory").texture = null;
		var spawn = Instantiate(Cube,GameObject.Find("SpawnCube").transform.position,transform.rotation);
		spawn.name = "Cube";
	}
	
	if(transform.position.y > 12){
		
		main.GetElement("Text","MessageBox").Text = "Good Job!";
		main.GetElement("OK","MessageBox").Text = "Restart";
		main.GetPage("Inventory").Show = false;
		main.GetPage("MessageBox").Show = true;
		wonGame = true;
		
		for(var i = 0; i < 8; i++){
			
			main.GetElement("Slot"+i,"Inventory").texture = null;
		}
	}
}