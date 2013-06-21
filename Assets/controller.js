#pragma strict
//var GUIscore:GUIText;
var score:float;
var p:float;
var width:float;
var height:float;
function Start () {
score=0;
}
function OnGUI(){
GUI.Box(new Rect(Screen.width-130,p,width,height),"Distance: "+parseInt(score)+" meters");
}


    var speed : float = 5;
    var x : float;
    var z : float;
    
    function Update () {
    //GUIscore.guiText.text="Score: "+parseInt(score)+" meters";
   
    x = Input.GetAxis("Horizontal") * speed;
    z = Input.GetAxis("Vertical") * speed * Time.deltaTime;
	transform.Rotate(0,x,0);
    transform.Translate(0, 0, z);
    score+=z;
    }