#pragma strict
var player:GameObject;
function Start () {

}

function Update () {
if(Vector3.Distance(transform.position,player.transform.position)<4)
transform.Translate(0,0,transform.position.z-player.transform.position.z);
}