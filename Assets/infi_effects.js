#pragma strict

var player:GameObject;
var rate:float;
var terrain0:GameObject;
var size_terrain:float;
var tolerance:float;
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
Instantiate (terrain0, Vector3(size_terrain, 0, 0), Quaternion.identity).name="Terrain1";
Instantiate (terrain0,Vector3(2*size_terrain, 0, 0), Quaternion.identity).name="Terrain2";
Instantiate (terrain0, Vector3(3*size_terrain, 0, 0), Quaternion.identity).name="Terrain3";
for(var i=1;i<8;i++){
Instantiate(terrain0,Vector3(0,0,i*size_terrain),Quaternion.identity).name="Terrain"+i*4;
Instantiate(terrain0,Vector3(size_terrain,0,i*size_terrain),Quaternion.identity).name="Terrain"+(i*4+1);
Instantiate(terrain0,Vector3(2*size_terrain,0,i*size_terrain),Quaternion.identity).name="Terrain"+(i*4+2);
Instantiate(terrain0,Vector3(3*size_terrain,0,i*size_terrain),Quaternion.identity).name="Terrain"+(i*4+3);
}

}

function Update () {

var temp1:Transform;
var temp2:Transform;
var temp3:Transform;
var temp4:Transform;
temp1=GameObject.Find("Terrain"+index).transform;
if(player.transform.position.z-temp1.position.z>(size_terrain+tolerance)){
temp2=GameObject.Find("Terrain"+(index+1)).transform;
temp3=GameObject.Find("Terrain"+(index+2)).transform;
temp4=GameObject.Find("Terrain"+(index+3)).transform;
temp1.Translate(Random.Range(-60,60),Random.Range(2,80),8*size_terrain);
temp2.Translate(-Random.Range(-60,60),Random.Range(2,80),8*size_terrain);
temp3.Translate(Random.Range(-60,60),Random.Range(2,80),8*size_terrain);
temp4.Translate(-Random.Range(-60,60),Random.Range(2,80),8*size_terrain);
index=(index+4)%32;
}
for(var i=0;i<8;i++){
temp1=GameObject.Find("Terrain"+4*i).transform;
if(temp1.position.y!=0){
temp1.position=Vector3.Lerp(temp1.position,Vector3(0,0,temp1.position.z),rate);
temp2=GameObject.Find("Terrain"+(4*i+1)).transform;
temp3=GameObject.Find("Terrain"+(4*i+2)).transform;
temp4=GameObject.Find("Terrain"+(4*i+3)).transform;
if(temp2.position.y!=0)
temp2.position=Vector3.Lerp(temp2.position,Vector3(size_terrain,0,temp2.position.z),rate);
if(temp3.position.y!=0)
temp3.position=Vector3.Lerp(temp3.position,Vector3(2*size_terrain,0,temp3.position.z),rate);
if(temp4.position.y!=0)
temp4.position=Vector3.Lerp(temp4.position,Vector3(3*size_terrain,0,temp4.position.z),rate);
}
}

}
