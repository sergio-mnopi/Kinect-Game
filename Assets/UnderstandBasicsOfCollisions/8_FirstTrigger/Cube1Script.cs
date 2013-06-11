// Cube1Script.cs
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

public class Cube1Script : MonoBehaviour {
	
	//------------------------------------------------------------
	// Use this for initialization
	void Start () {
	
	}
	
	//------------------------------------------------------------
	// Update is called once per frame
	// move the cube
	void Update () {
		transform.Translate( Input.GetAxis("Horizontal")/6.0f, 0,0);
	}
}
