#include "task.h"

using namespace std;

int candidates_a[3] = {1000, 2000, 3000}; // valid 'a' value
int range_b[2] = {10, 50}; // valid range for 'b' value is [10, 50)

void task1(vector<Row>& rows, int nrows) {
	for (int i = 0; i < rows.size(); i++) {
		/* suppose selectivity for 'b' is better */
		if (rows[i].b >= 10 && rows[i].b < 50 &&
			(rows[i].a == 1000 || rows[i].a == 2000 || rows[i].a == 3000))
			printf("%d, %d\n", rows[i].a, rows[i].b);
	}
}

void task2(vector<Row>& rows, int nrows) {
	if (rows.empty()) return;

	vector<Row>::iterator itl = rows.begin();
	vector<Row>::iterator itr = rows.end();
	
    /* Comparison function for sorting by 'a' field. */
	auto compA = [](const Row& row1, const Row& row2) {
		return row1.a < row2.a;
	};

    /* Comparison function for sorting by 'b' field. */
	auto compB = [](const Row& row1, const Row& row2) {
		return row1.b < row2.b;
	};

	/*
	 * Loop through candidate values for 'a'.
	 * 
	 * The underlying concept is as follows:
	 * As the rows are initially sorted by 'a' and then by 'b', rows with the
	 * same 'a' value are grouped together.
	 * By using binary search, we can quickly identify the range of rows that
	 * share the same 'a' value in the `candidates_a` list.
	 * Within each group of rows with the same 'a' value, all the rows with
	 * the same 'b' value are also positioned consecutively.
	 * For each 'a' group, we apply binary search again to find the range of
	 * rows where 'b' falls within [range_b[0], range_b[1]).
	 *
	 * Since expanding the code by hardcoding the repetitive segments may lead
	 * to better performance, you might consider replacing the loop with three
	 * separate segments of code.
	 */
	for (auto candidate_a: candidates_a) {
		if (itl->a > candidate_a) continue;

		/*
		 * Find the first iterator which is equal to or greater than
		 * candidate 'a'.
		 */
		itl = lower_bound(itl, rows.end(), Row(candidate_a, 0), compA);
		if (itl != rows.end() && itl->a == candidate_a) {
			/*
			 * Find the first iterator which is greater than candidate 'a',
			 * which means all rows in the range [itl, itr) have 'a' equal to
			 * candidate 'a'.
			 */
			itr = upper_bound(itl, rows.end(), Row(candidate_a, 0), compA);

			/*
			 * Now, it's time to search for the range of 'b' values
			 * [range_b[0], range_b[1]).
			 *
			 * `itl` is the first iterator which is equal to or greater than
			 * range_b[0], if `itl->b < range_b[1]`, then it's the first legal
			 * rows which has a is equal to candidate_a && b belong to
			 * [range_b[0], range_b[1]).
			 */
			itl = lower_bound(itl, itr, Row(0, range_b[0]), compB);
			if (itl != itr && itl->b < range_b[1]) {
				/*
				 * `itr` is the first iterator which is equal to or greater than
				 * range_b[1], which means all rows range in [itl, itr) are
				 * valid rows.
				 */
				itr = lower_bound(itl, itr, Row(0, range_b[1]), compB);

				/* Print all valid rows. */
				while (itl != itr) {
					printf("%d, %d\n", itl->a, itl->b);
					itl++;
				}
			}
		}
	}
}

void task3(vector<Row>& rows, int nrows) {
	if (rows.empty()) return;

	vector<Row>::iterator itl = rows.begin();
	vector<Row>::iterator itr = rows.end();

	/*
	 * Divide the valid rows into groups based on their 'a' values. Each group's
	 * range is denoted as [begin, end).
	 * The 'begin' and 'end' vectors are utilized to store the starting and
	 * ending iterators of each group.
	 *
	 * The core idea is that we have already sorted each group's rows by `b`
	 * since they share the same `a` value within a group.
	 * Instead of sorting all rows by `b` once again, we can implement a merge
	 * sort approach. During printing, we select the rows with the smallest `b`
	 * among all groups by comparing only the first element of each group.
	 */
	vector<vector<Row>::iterator> begin;
	vector<vector<Row>::iterator> end;

	/* Comparison function for sorting by 'a' field. */
	auto compA = [](const Row& row1, const Row& row2) {
		return row1.a < row2.a;
	};

    /* Comparison function for sorting by 'b' field. */
	auto compB = [](const Row& row1, const Row& row2) {
		return row1.b < row2.b;
	};

	/*
	 * Loop through candidate values for 'a'.
	 * 
	 * The underlying concept is as follows:
	 * As the rows are initially sorted by 'a' and then by 'b', rows with the
	 * same 'a' value are grouped together.
	 * By using binary search, we can quickly identify the range of rows that
	 * share the same 'a' value in the `candidates_a` list.
	 * Within each group of rows with the same 'a' value, all the rows with
	 * the same 'b' value are also positioned consecutively.
	 * For each 'a' group, we apply binary search again to find the range of
	 * rows where 'b' falls within [range_b[0], range_b[1]).
	 *
	 * Since expanding the code by hardcoding the repetitive segments may lead
	 * to better performance, you might consider replacing the loop with three
	 * separate segments of code.
	 */
	for (auto candidate_a: candidates_a) {
		if (itl->a > candidate_a) continue;

		/*
		 * Find the first iterator which is equal to or greater than
		 * candidate 'a'.
		 */
		itl = lower_bound(itl, rows.end(), Row(candidate_a, 0), compA);
		if (itl != rows.end() && itl->a == candidate_a) {
			/*
			 * Find the first iterator which is greater than candidate 'a',
			 * which means all rows in the range [itl, itr) have 'a' equal to
			 * candidate 'a'.
			 */
			itr = upper_bound(itl, rows.end(), Row(candidate_a, 0), compA);

			/*
			 * Now, it's time to search for the range of 'b' values
			 * [range_b[0], range_b[1]).
			 *
			 * `itl` is the first iterator which is equal to or greater than
			 * range_b[0], if `itl->b < range_b[1]`, then it's the first legal
			 * rows which has a is equal to candidate_a && b belong to
			 * [range_b[0], range_b[1]).
			 */
			itl = lower_bound(itl, itr, Row(0, range_b[0]), compB);
			if (itl != itr && itl->b < range_b[1]) {
				/*
				 * `itr` is the first iterator which is equal to or greater than
				 * range_b[1], which means all rows range in [itl, itr) are
				 * valid rows.
				 */
				itr = lower_bound(itl, itr, Row(0, range_b[1]), compB);
				begin.push_back(itl);
				end.push_back(itr);
			}
		}
	}

	/*
	 * Use an iterator 'it' to indicate the smallest 'b' of all remaining rows, 
	 * grouped by 'a'.
	 */
	vector<Row>::iterator smallest_it;
	/* 'which' keeps track of the index of the current smallest group. */
	int which;

	while (!begin.empty()) {
		smallest_it = begin[0];
		which = 0;
		/*
		 * Find the smallest 'b' iterator among different groups based on their
		 * 'b' values.
		 */
		for (int i = 1; i < begin.size(); i++) {
			if (smallest_it->b > begin[i]->b) {
				smallest_it = begin[i];
				which = i;
			}
		}

		printf("%d, %d\n", smallest_it->a, smallest_it->b);

		begin[which]++;
		if (begin[which] == end[which]) {
			/*
			 * If 'it' reaches the end of the current group's range, we need to
			 * remove the current group.
			 * Since we at most have three groups, it's okay to use erase.
			 */
			begin.erase(begin.begin() + which);
			end.erase(end.begin() + which);
		}
	}
}
