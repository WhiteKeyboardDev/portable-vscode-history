package expressTest;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import express.Lamda;

class LamdaTest {

	@Test
	void test() {
		Lamda lamda = new Lamda();
		assertEquals(true, lamda.max(10, 5));
	}

}
