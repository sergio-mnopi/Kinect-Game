// Cube11Script.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 

	//------------------------------------------------------------
	// Update is called once per frame
	// move the cube
function Update () {
		transform.Translate( Input.GetAxis("Horizontal")/8.0f, 0,0);
	}
