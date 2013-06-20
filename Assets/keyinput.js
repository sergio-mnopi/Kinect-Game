#pragma strict
var car:GameObject;
var cube:GameObject;
function Start () {
 car=GameObject.Find("car");
 cube=GameObject.Find("Cube");
}

function Update () {
print(Time.deltaTime);
if(Input.GetKeyDown("r")){
	print ("r pressed");
	Instantiate(car,cube.transform.position+Vector3(0,0,10),Quaternion.identity);
}
}