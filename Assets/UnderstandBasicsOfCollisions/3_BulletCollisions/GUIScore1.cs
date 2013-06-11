// GUIScore1.cs
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

public class GUIScore1 : MonoBehaviour {

	private int totalPoint=0;
	
	//-------------------------------------------
	// Use this for initialization
	void Start () {
		guiText.text = "Score: "+totalPoint;
	}
	
	//-------------------------------------------
	// Update is called once per frame
	void Update () {
	
	}
	
	//-------------------------------------------
	// just draw number of points
	void ApplyPoints(int point)
	{
		totalPoint +=  point;
		guiText.text = "Cube affected: "+totalPoint;
	}
}
