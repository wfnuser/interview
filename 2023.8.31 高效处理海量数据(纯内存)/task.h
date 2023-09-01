
#include<cstdio>
#include<cstdlib>
#include<iostream>
#include<vector>

using namespace std;

struct Row
{
	int a;
	int b;
	Row(int a, int b) : a(a), b(b) {}
};

void task1(vector<Row>& rows, int nrows);
void task2(vector<Row>& rows, int nrows);
void task3(vector<Row>& rows, int nrows);
