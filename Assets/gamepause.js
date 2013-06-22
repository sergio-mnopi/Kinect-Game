#pragma strict

function Start () {
Screen.showCursor=false;
Screen.lockCursor = true;
}

function Update () {


 
if(Input.GetKeyDown("escape"))   
{
 
    if (Time.timeScale == 1.0)
    {  
              
       Time.timeScale = 0.000001;
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