// LiftDetect.cs
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 
// 

using UnityEngine;
using System.Collections;

public class LiftDetect : MonoBehaviour {

	public GameObject lift;
	
	// for open/close door
	private int liftState=0;

	
	//------------------------------------------------------------
	// Use this for initialization
	void Start () {
	}
	

	//------------------------------------------------------------
	// Update is called once per frame
	// lift sequence
	void Update () {
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
	void OnTriggerEnter (Collider collision) {

		if(collision.gameObject.tag == "Player")	{
			liftState=1;
		}
	}

	//------------------------------------------------------------
	// exit trigger detection
	void OnTriggerExit (Collider collision) {

		if(collision.gameObject.tag == "Player")	{
			liftState=-1;
		}
	}
}
