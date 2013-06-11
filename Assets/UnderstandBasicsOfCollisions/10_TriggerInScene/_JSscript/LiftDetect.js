// LiftDetect.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 

public var lift: GameObject;
	
	// for open/close door
private var liftState: int=0;

	//------------------------------------------------------------
	// Update is called once per frame
	// lift sequence
function Update () {
		if( (liftState>0) && (liftState<100)) {
			lift.transform.Translate(0,-0.1f,0);
			liftState+=1;
		}
		if( (liftState<0) && (liftState>-100)) {
			lift.transform.Translate(0,0.1f,0);
			liftState-=1;
		}
	}
	
	//------------------------------------------------------------
	// enter trigger detection 
function OnTriggerEnter (collision:Collider) {

		if(collision.gameObject.tag == "Player")	{
			liftState=1;
		}
	}

	//------------------------------------------------------------
	// exit trigger detection
function OnTriggerExit (collision:Collider) {

		if(collision.gameObject.tag == "Player")	{
			liftState=-1;
		}
	}