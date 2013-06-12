#pragma strict
var Offset_Top:GameObject;
var terrain1:GameObject;
var terrain2:GameObject;
function Start () {
Offset_Top=GameObject.Find("Offset Top");
terrain1=GameObject.Find("Terrain1");
terrain2=GameObject.Find("Terrain2");
Offset_Top.transform.Translate(0,-4,0);
}

function Update () {

if((Offset_Top.transform.position.y-terrain1.transform.position.y)>=0.5)
	Offset_Top.transform.Translate(0,-0.5,0);
}