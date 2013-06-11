// PlayerMove.cs
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

public class PlayerMove : MonoBehaviour {

	public float engineForce=0.5f;
	
	//
	private Transform CoM;

	
	//------------------------------------------------------------
	// Use this for initialization
	void Start() 
	{	// get and set center of gravity
		CoM = transform.Find("/" + name + "/CenterOfMass");
		rigidbody.centerOfMass = new Vector3(0, CoM.localPosition.y, 0);
	}
	
	//------------------------------------------------------------
	// Update is called once per frame
	// little control player
	void FixedUpdate() 
	{
		//-----------------------------------------------------------------
		// directionnal control
		//-----------------------------------------------------------------
		rigidbody.transform.Rotate(0, Input.GetAxis("Horizontal")*2.0f, 0);		
		rigidbody.transform.Translate(Vector3.forward * Input.GetAxis("Vertical") * engineForce * Time.deltaTime);		
	}
}

