
#pragma strict

var player:GameObject;
var rate:float;
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
var status:Vector3;
var changed:int;
var pos_array:Vector3[];
var terrain_array:GameObject[];
var quat_clock : Quaternion = Quaternion.AngleAxis(-90,Vector3.up);
var quat_anti : Quaternion = Quaternion.AngleAxis(90,Vector3.up);


function Start () {
index=0;
status=Vector3(0,0,size_terrain);
changed=0;

terrain_array[0]=GameObject.Find("Terrain0");
pos_array[0]=terrain_array[0].transform.position;
Instantiate (terrain_array[0], Vector3(size_terrain, 0, 0), Quaternion.identity).name="Terrain1";
terrain_array[1]=GameObject.Find("Terrain1");
pos_array[1]=terrain_array[1].transform.position;
Instantiate (terrain_array[0],Vector3(2*size_terrain, 0, 0), Quaternion.identity).name="Terrain2";
terrain_array[2]=GameObject.Find("Terrain2");
pos_array[2]=terrain_array[2].transform.position;
Instantiate (terrain_array[0], Vector3(3*size_terrain, 0, 0), Quaternion.identity).name="Terrain3";
terrain_array[3]=GameObject.Find("Terrain3");
pos_array[3]=terrain_array[3].transform.position;
for(var i=1;i<8;i++){

Instantiate(terrain_array[0],Vector3(0,0,i*size_terrain),Quaternion.identity).name="Terrain"+i*4;
terrain_array[i*4]=GameObject.Find("Terrain"+i*4);
pos_array[i*4]=terrain_array[i*4].transform.position;
Instantiate(terrain_array[0],Vector3(size_terrain,0,i*size_terrain),Quaternion.identity).name="Terrain"+(i*4+1);
terrain_array[i*4+1]=GameObject.Find("Terrain"+(i*4+1));
pos_array[i*4+1]=terrain_array[i*4+1].transform.position;
Instantiate(terrain_array[0],Vector3(2*size_terrain,0,i*size_terrain),Quaternion.identity).name="Terrain"+(i*4+2);
terrain_array[i*4+2]=GameObject.Find("Terrain"+(i*4+2));
pos_array[i*4+2]=terrain_array[i*4+2].transform.position;
Instantiate(terrain_array[0],Vector3(3*size_terrain,0,i*size_terrain),Quaternion.identity).name="Terrain"+(i*4+3);
terrain_array[i*4+3]=GameObject.Find("Terrain"+(i*4+3));
pos_array[i*4+3]=terrain_array[i*4+3].transform.position;
}

}

function Update () {
var comp:int;
if(Input.GetKeyDown("u")){
status=quat_clock*status;
changed=1;
 
}
if(Input.GetKeyDown("i")){
status=quat_anti*status;
changed=-1;
print("i pressed and changed="+changed);
}
//print(changed);
if(Vector3.Distance(player.transform.position,terrain_array[index+1].transform.position)>(size_terrain+tolerance)&&Vector3.Distance(player.transform.position,terrain_array[index+2].transform.position)>size_terrain+tolerance){
terrain_array[index+1].transform.Translate(pos_array[((index-3)%32+32)%32]+Random.insideUnitSphere*160+Vector3(80,80,0));
terrain_array[index+2].transform.Translate(pos_array[((index-2)%32+32)%32]+Random.insideUnitSphere*160+Vector3(-80,80,0));
terrain_array[index+3].transform.Translate(pos_array[((index-1)%32+32)%32]+Random.insideUnitSphere*160+Vector3(80,80,0));
terrain_array[index].transform.Translate(pos_array[((index-4)%32+32)%32]+Random.insideUnitSphere*160+Vector3(-80,80,0));
if(changed==0){
pos_array[index]=pos_array[((index-4)%32+32)%32]+status;
pos_array[index+1]=pos_array[((index-3)%32+32)%32]+status;
pos_array[index+2]=pos_array[((index-2)%32+32)%32]+status;
pos_array[index+3]=pos_array[((index-1)%32+32)%32]+status;
}
else if(changed==-1){
pos_array[index]=pos_array[((index-4)%32+32)%32]+status*4;
pos_array[index+1]=pos_array[((index-3)%32+32)%32]+status*3+quat_anti*(1*status);
pos_array[index+2]=pos_array[((index-2)%32+32)%32]+status*2+quat_anti*(2*status);
pos_array[index+3]=pos_array[((index-1)%32+32)%32]+status+quat_anti*(3*status);
changed=0;
}
else if(changed==1){
pos_array[index]=pos_array[((index-4)%32+32)%32]+status+quat_clock*(3*status);
pos_array[index+1]=pos_array[((index-3)%32+32)%32]+status*2+quat_clock*(2*status);
pos_array[index+2]=pos_array[((index-2)%32+32)%32]+status*3+quat_clock*(1*status);
pos_array[index+3]=pos_array[((index-1)%32+32)%32]+status*4;
changed=0;
}
index=(index+4)%32;
}

for(var i=0;i<8;i++){
if(terrain_array[4*i].transform.position!=pos_array[4*i])
terrain_array[4*i].transform.position=Vector3.Lerp(terrain_array[4*i].transform.position,pos_array[4*i],rate);
if(terrain_array[4*i+1].transform.position!=pos_array[4*i+1])
terrain_array[4*i+1].transform.position=Vector3.Lerp(terrain_array[4*i+1].transform.position,pos_array[4*i+1],rate);
if(terrain_array[4*i+2].transform.position!=pos_array[4*i+2])
terrain_array[4*i+2].transform.position=Vector3.Lerp(terrain_array[4*i+2].transform.position,pos_array[4*i+2],rate);
if(terrain_array[4*i+3].transform.position!=pos_array[4*i+3])
terrain_array[4*i+3].transform.position=Vector3.Lerp(terrain_array[4*i+3].transform.position,pos_array[4*i+3],rate);
}

}


