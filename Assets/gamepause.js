#pragma strict

function Start () {

}

function Update () {

Screen.showCursor = false;
Screen.lockCursor = true;
 
if(Input.GetKeyDown("escape"))   
{
 
    if (Time.timeScale == 1.0)
    {            
       Time.timeScale = 0.00001;
       Screen.showCursor = true;
       Screen.lockCursor = false;
    }       
 
    else
    {
       Time.timeScale = 1.0; 
       Screen.showCursor = false;
       Screen.lockCursor = true;                 
    }
 
}
}