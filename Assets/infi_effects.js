#pragma strict

var player:GameObject;
var rate:float;
var terrain0:GameObject;
/*
var terrain1:GameObject;
var terrain2:GameObject;
var terrain3:GameObject;
var terrain4:GameObject;
var terrain5:GameObject;
var terrain6:GameObject;
var terrain7:GameObject;
var terrain8:GameObject;
var terrain9:GameObject;
var terrain10:GameObject;
var terrain11:GameObject;
var terrain12:GameObject;
var terrain13:GameObject;
var terrain14:GameObject;
var terrain15:GameObject;*/
var index:int;


function Start () {
index=0;
terrain0=GameObject.Find("Terrain0");
Instantiate (terrain0, Vector3(5, 0, 0), Quaternion.identity).name="Terrain1";
//terrain1=GameObject.Find("Terrain1");
Instantiate (terrain0,Vector3(0, 0, 5), Quaternion.identity).name="Terrain2";
//terrain2=GameObject.Find("Terrain2");
Instantiate (terrain0, Vector3(5, 0, 5), Quaternion.identity).name="Terrain3";
//terrain3=GameObject.Find("Terrain3");
Instantiate (terrain0,Vector3(0, 0, 10), Quaternion.identity).name="Terrain4";
//terrain4=GameObject.Find("Terrain4");
Instantiate (terrain0, Vector3(5, 0, 10), Quaternion.identity).name="Terrain5";
//terrain5=GameObject.Find("Terrain5");
Instantiate (terrain0,Vector3(0, 0, 15), Quaternion.identity).name="Terrain6";
//terrain6=GameObject.Find("Terrain6");
Instantiate (terrain0, Vector3(5, 0, 15), Quaternion.identity).name="Terrain7";
//terrain7=GameObject.Find("Terrain7");
Instantiate (terrain0,Vector3(0, 0, 20), Quaternion.identity).name="Terrain8";
//terrain8=GameObject.Find("Terrain8");
Instantiate (terrain0, Vector3(5, 0, 20), Quaternion.identity).name="Terrain9";
//terrain9=GameObject.Find("Terrain9");
Instantiate (terrain0,Vector3(0, 0, 25), Quaternion.identity).name="Terrain10";
//terrain10=GameObject.Find("Terrain10");
Instantiate (terrain0, Vector3(5, 0, 25), Quaternion.identity).name="Terrain11";
//terrain11=GameObject.Find("Terrain11");
Instantiate (terrain0,Vector3(0, 0, 30), Quaternion.identity).name="Terrain12";
//terrain12=GameObject.Find("Terrain12");
Instantiate (terrain0, Vector3(5, 0, 30), Quaternion.identity).name="Terrain13";
//terrain13=GameObject.Find("Terrain13");
Instantiate (terrain0,Vector3(0, 0, 35), Quaternion.identity).name="Terrain14";
//terrain14=GameObject.Find("Terrain14");
Instantiate (terrain0, Vector3(5, 0, 35), Quaternion.identity).name="Terrain15";
//terrain15=GameObject.Find("Terrain15");

}

function Update () {
var temp:Transform;
var temp2:Transform;
temp=GameObject.Find("Terrain"+index).transform;
if(player.transform.position.z-temp.position.z>8){
temp2=GameObject.Find("Terrain"+(index+1)).transform;
temp.Translate(Random.Range(-40,40),Random.Range(-40,40),40);
temp2.Translate(Random.Range(-40,40),Random.Range(-40,40),40);
index=(index+2)%16;
}
for(var i=0;i<8;i++){
temp=GameObject.Find("Terrain"+2*i).transform;
if(temp.position.y!=0){
temp2=GameObject.Find("Terrain"+(2*i+1)).transform;
temp.position=Vector3.Lerp(temp.position,Vector3(0,0,temp.position.z),rate);
temp2.position=Vector3.Lerp(temp2.position,Vector3(5,0,temp2.position.z),rate);
}
}
}