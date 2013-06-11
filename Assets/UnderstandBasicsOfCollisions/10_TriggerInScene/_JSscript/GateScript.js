// GateScript.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 

public var pivot:GameObject;
	
	// for open/close door
private var doorState:int=0;

	//------------------------------------------------------------
	// Update is called once per frame
	// open/close gate sequence
function Update () {
	if( (doorState>0) && (doorState<90)) {
		pivot.transform.Rotate(0,8,0);
		doorState+=8;
	}
	if( (doorState<0) && (doorState>-90)) {
		pivot.transform.Rotate(0,-8,0);
		doorState-=8;
	}
}
	
	//------------------------------------------------------------
	// enter trigger detection 
function OnTriggerEnter (collision:Collider) {

	if(collision.gameObject.tag == "Player")	{
		doorState=1;
	}
}

	//------------------------------------------------------------
	// exit trigger detection
function OnTriggerExit (collision:Collider) {

	if(collision.gameObject.tag == "Player")	{
		doorState=-1;
	}
}	
