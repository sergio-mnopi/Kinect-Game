var movie:MovieTexture;
function Start(){
Screen.showCursor=false;
renderer.material.mainTexture=movie;
movie.Play();
audio.clip=movie.audioClip;
audio.Play();
}

function Update(){

if(Input.GetKeyDown(KeyCode.Return)){
print("enter pressed");
movie.Stop();
audio.Stop();
Application.LoadLevel("main_menu");
}
}
