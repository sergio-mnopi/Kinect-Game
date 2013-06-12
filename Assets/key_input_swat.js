#pragma strict
var car:GameObject;
var player:GameObject;
var i:int;
var status:int;
var x:GameObject;
var destroy:int;
function Start () {
i=0;
status=0;
 car=GameObject.Find("Cube");
 player=GameObject.Find("Offset Top");
}

function Update () {
if(Input.GetKeyDown("r")){
	print ("r pressed");
	var clone:GameObject;
	clone=Instantiate(car,player.transform.position+Vector3(10,0,7),Quaternion.identity);
	clone.name="Cube"+i;
	i++;
	
	
}
		if(GameObject.Find("Cube"+status).transform.position.z-player.transform.position.z<-10){
			destroy=1;
			}
		if (destroy==1){
			Destroy(GameObject.Find("Cube"+status));
			print("Cube"+status+"destroyed");
			status++;
			}
			destroy=0;
}