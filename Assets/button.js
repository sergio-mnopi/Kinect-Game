#pragma strict

// Draws 2 buttons, one with an image, and other with a text
    // And print a message when they got clicked.
    var btnTexture : Texture;
    var x:float;
    var y:float;
    var w:float;
    var h:float;
   var yourCursor : Texture2D;  // Your cursor texture
var cursorSizeX : int = 16;  // Your cursor size x
var cursorSizeY : int = 16;  // Your cursor size y
function Start()
{
    Screen.showCursor = false;
}
    function OnGUI() {
    
        if (!btnTexture) {
            Debug.LogError("Please assign a texture on the inspector");
            return;
        }
        if (GUI.Button(Rect(x,y,w,h),btnTexture)){
            Debug.Log("Clicked the button with an image");
            Application.LoadLevel("terrain_scaled");
            }
            GUI.DrawTexture (Rect(Event.current.mousePosition.x-cursorSizeX/2, Event.current.mousePosition.y-cursorSizeY/2, cursorSizeX, cursorSizeY), yourCursor);
        //if (GUI.Button(Rect(10,70,50,30),"Click"))
          //  Debug.Log("Clicked the button with text");
    }
function Update () {

}