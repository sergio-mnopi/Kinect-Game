// GUIScore2.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 

private var totalPoint: int=0;
	
	// Use this for initialization
function Start () {
	guiText.text = "Score: "+totalPoint;
}
	
function Update () {
}

	// number of points
function ApplyPoints( point: int)
{
		totalPoint +=  point;
		guiText.text = "Cube affected: "+totalPoint;
}