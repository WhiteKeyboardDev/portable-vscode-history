package expressTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import tree.NodePick;

public class NodePickTest {

	@Test
	void test() {
		int[][] a = {{3, 6}, {4, 3}, {3, 2}, {1, 3}, {1, 2}, {2, 4}, {5, 2}};
		int tmp = new NodePick().solution(6, a);
		assertEquals(3, tmp);
	}
}
