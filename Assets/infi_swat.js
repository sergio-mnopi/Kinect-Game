#pragma strict
var terrain1:GameObject;
var terrain2:GameObject;
var Offset_Top:GameObject;
var status:int;
var changed:int;
function Start () {
status=0;
changed= 0;
terrain1=GameObject.Find("Terrain1");
terrain2=GameObject.Find("Terrain2");
Offset_Top=GameObject.Find("Offset Top");
}


function Update () {
if(Input.GetKeyDown("u")){
if(status==0)
status=3;
else
	status=(status-1)%4;
	/*if(status<0){
       status=status+4;
       print("w");
       }*/
	print ("u pressed "+status);
	changed=-1;
	
}
if(Input.GetKeyDown("i")){

status=(status+1)%4;
if(status<0)
status=status+4;
print ("i pressed "+status);
changed=1;
}
if(Vector3.Distance(Offset_Top.transform.position,terrain1.transform.position)>50){
	if(status==0){
	if(changed==0)
	terrain1.transform.Translate(0,0,60);
	else if(changed==1)
	terrain1.transform.Translate(-30,0,30);
	else
	terrain1.transform.Translate(30,0,30);
	}
	else if(status==1){
	if(changed==0)
	terrain1.transform.Translate(60,0,0);
	else if(changed==1)
	terrain1.transform.Translate(30,0,30);
	else if(changed==-1)
	terrain1.transform.Translate(30,0,-30);
	}
	else if(status==2){
	if(changed==0)
	terrain1.transform.Translate(0,0,-60);
	else if(changed==1)
	terrain1.transform.Translate(30,0,-30);
	else if(changed==-1)
	terrain1.transform.Translate(-30,0,-30);
	}
	else if(status==3){
	if(changed==0)
	terrain1.transform.Translate(-60,0,0);
	else if(changed==1)
	terrain1.transform.Translate(-30,0,-30);
	else if(changed==-1)
	terrain1.transform.Translate(-30,0,30);
	}
	changed=0;
}
if(Vector3.Distance(Offset_Top.transform.position,terrain2.transform.position)>50){
	if(status==0){
	if(changed==0)
	terrain2.transform.Translate(0,0,60);
	else if(changed==1)
	terrain2.transform.Translate(-30,0,30);
	else
	terrain2.transform.Translate(30,0,30);
	}
	else if(status==1){
	if(changed==0)
	terrain2.transform.Translate(60,0,0);
	else if(changed==1)
	terrain2.transform.Translate(30,0,30);
	else if(changed==-1)
	terrain2.transform.Translate(30,0,-30);
	}
	else if(status==2){
	if(changed==0)
	terrain2.transform.Translate(0,0,-60);
	else if(changed==1)
	terrain2.transform.Translate(30,0,-30);
	else if(changed==-1)
	terrain2.transform.Translate(-30,0,-30);
	}
	else if(status==3){
	if(changed==0)
	terrain2.transform.Translate(-60,0,0);
	else if(changed==1)
	terrain2.transform.Translate(-30,0,-30);
	else if(changed==-1)
	terrain2.transform.Translate(-30,0,30);
	}
	changed=0;
}

}