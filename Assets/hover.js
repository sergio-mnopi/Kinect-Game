#pragma strict
var levelToLoad : String;
var soundhover : AudioClip;
var beep : AudioClip;
var QuitButton : boolean = false;
var background:Transform;
var texture_back1:Material;
var texture_back2:Material;
var text_color:Color;
 var track:boolean=true;
 var text:GameObject;
function OnMouseEnter(){

	text.renderer.material.color=Color.white;
	background.renderer.material=texture_back1;
    audio.PlayOneShot(soundhover);
}
function OnMouseExit(){

	text.renderer.material.color=Color.gray;
	background.renderer.material=texture_back2;
}
 
function OnMouseUp(){
	
    audio.PlayOneShot(beep);
    yield new WaitForSeconds(0.35);
    if(QuitButton){
       Application.Quit();
    }
    else{
    
       Application.LoadLevel(levelToLoad);
    }
}
 
@script RequireComponent(AudioSource)