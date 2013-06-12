#pragma strict
var terrain1:GameObject;
var terrain2:GameObject;
var Offset_Top:GameObject;
function Start () {
terrain1=GameObject.Find("Terrain1");
terrain2=GameObject.Find("Terrain2");
Offset_Top=GameObject.Find("Offset Top");
}


function Update () {
if((Offset_Top.transform.position.z-terrain1.transform.position.z)>=50){
 terrain1.transform.Translate(0,0,60);
 print ("Translated terrain1");
 }
 else if((Offset_Top.transform.position.z-terrain2.transform.position.z)>=50){
 terrain2.transform.Translate(0,0,60);
 print ("Translated terrain2");
}
}