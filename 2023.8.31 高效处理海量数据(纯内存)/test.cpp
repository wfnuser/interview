#include "task.h"

using namespace std;

int main() {
	/* initialize dataset */ 
	vector<Row> rows = {
        {1000, 72},
        {2000, 33},
        {1500, 12},
        {1000, 31},
        {1500, 34},
        {2000, 22}
    };
	int nrows = rows.size();

	/* sort rows for task2 and task3 */
	vector<Row> sorted_rows = rows;
	sort(sorted_rows.begin(), sorted_rows.end(), [](const Row& a, const Row& b){
		return a.a < b.a || (a.a == b.a && a.b < b.b);
	});

	cout << "No external test frameworks are permitted." << endl;
	cout << "Generate random tests instead." << endl;

	cout << "Task's Orginal Sample." << endl;
	cout << "task1: " << endl;
	task1(rows, nrows);
	cout << "task2: " << endl;
	task2(sorted_rows, nrows);
	cout << "task3: " << endl;
	task3(sorted_rows, nrows);
	cout << "--------------------" << endl;

	sorted_rows = {
		{3000, 1},
		{3000, 2},
		{1001, 10}
	};
	nrows = sorted_rows.size();
	cout << "No valid row." << endl;
	cout << "task2: " << endl;
	task2(sorted_rows, nrows);
	cout << "task3: " << endl;
	task3(sorted_rows, nrows);
	cout << "--------------------" << endl;

	sorted_rows = {};
	nrows = 0;
	cout << "Empty set." << endl;
	cout << "task2: " << endl;
	task2(sorted_rows, nrows);
	cout << "task3: " << endl;
	task3(sorted_rows, nrows);
	cout << "--------------------" << endl;

	sorted_rows = {
		{999, 1},
		{999, 2}
	};
	nrows = 0;
	cout << "All a small." << endl;
	cout << "task2: " << endl;
	task2(sorted_rows, nrows);
	cout << "task3: " << endl;
	task3(sorted_rows, nrows);
	cout << "--------------------" << endl;

	sorted_rows = {
		{3999, 1},
		{3999, 2}
	};
	nrows = 0;
	cout << "All a large." << endl;
	cout << "task2: " << endl;
	task2(sorted_rows, nrows);
	cout << "task3: " << endl;
	task3(sorted_rows, nrows);
	cout << "--------------------" << endl;

	sorted_rows = {
		{1000, 8},
		{1000, 9},
		{3000, 50},
		{3000, 51}
	};
	nrows = 0;
	cout << "All b large or small." << endl;
	cout << "task2: " << endl;
	task2(sorted_rows, nrows);
	cout << "task3: " << endl;
	task3(sorted_rows, nrows);
	cout << "--------------------" << endl;


	sorted_rows = {
		{1000, 1},
		{1000, 3},
		{1000, 5},
		{1000, 7},
		{1000, 11}, // duplicate rows
		{1000, 11}, // duplicate rows
		{1000, 11}, // duplicate rows
		{1000, 13},
		{1000, 15},
		{1000, 17},
		{1000, 21},
		{1000, 23},
		{1000, 25},
		{1000, 27},
		{1001, 1},
		{1001, 3},
		{1001, 5},
		{1001, 7},
		{1001, 11},
		{1001, 13},
		{1001, 15},
		{1001, 17},
		{1001, 21},
		{1001, 23},
		{1001, 25},
		{1001, 27},

		{2000, 1},
		{2000, 3},
		{2000, 5},
		{2000, 7},
		{2000, 9}, // corner rows for b
		{2000, 10}, // corner rows for b
		{2000, 11},
		{2000, 13},
		{2000, 15},
		{2000, 17},
		{2000, 21},
		{2000, 23},
		{2000, 25},
		{2000, 27},
		{2000, 49}, // corner rows for b
		{2000, 50}, // corner rows for b
		{2001, 1 + 1},
		{2001, 1 + 3},
		{2001, 1 + 5},
		{2001, 1 + 7},
		{2001, 1 + 11},
		{2001, 1 + 13},
		{2001, 1 + 15},
		{2001, 1 + 17},
		{2001, 1 + 21},
		{2001, 1 + 23},
		{2001, 1 + 25},
		{2001, 1 + 27},

		{3000, 1},
		{3000, 3},
		{3000, 5},
		{3000, 7},
		{3000, 11},
		{3000, 13},
		{3000, 15},
		{3000, 17},
		{3000, 49},
		{3000, 50},
		{3000, 1 + 21},
		{3000, 1 + 23},
		{3000, 1 + 25},
		{3000, 1 + 27},
		{3001, 1 + 1},
		{3001, 1 + 3},
		{3001, 1 + 5},
		{3001, 1 + 7},
		{3001, 1 + 11},
		{3001, 1 + 13},
		{3001, 1 + 15},
		{3001, 1 + 17},
		{3001, 1 + 21},
		{3001, 1 + 23},
		{3001, 1 + 25},
		{3001, 1 + 27}
	};
	nrows = sorted_rows.size();
	sort(sorted_rows.begin(), sorted_rows.end(), [](const Row& a, const Row& b){
		return a.a < b.a || (a.a == b.a && a.b < b.b);
	});
	cout << "Complicate case." << endl;
	cout << "task1: " << endl;
	task1(sorted_rows, nrows);
	cout << "task2: " << endl;
	task2(sorted_rows, nrows);
	cout << "task3: " << endl;
	task3(sorted_rows, nrows);
	cout << "--------------------" << endl;


	return 0;
}
