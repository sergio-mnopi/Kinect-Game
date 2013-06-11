#pragma strict
var terrain1:GameObject;
var terrain2:GameObject;
var Cube:GameObject;
function Start () {
terrain1=GameObject.Find("Terrain1");
terrain2=GameObject.Find("Terrain2");
Cube=GameObject.Find("Cube");
}


function Update () {
if(Vector3.Distance(Cube.transform.position,terrain1.transform.position)>=75){
 terrain1.transform.Translate(0,0,80);
 print ("Translated terrain1");
 }
 else if(Vector3.Distance(Cube.transform.position,terrain2.transform.position)>=75){
 terrain2.transform.Translate(0,0,80);
 print ("Translated terrain2");
}
}