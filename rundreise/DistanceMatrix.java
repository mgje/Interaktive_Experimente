import java.util.ArrayList;

/**
 * Distance Matrix class
 * @author Lucia Blondel
 */

public class DistanceMatrix {
	
	private double[][] distanceMatrix;
	private String[] nameOfCities;
	private double[] posX;
	private double[] posY;
	
	/**
	 * Constructor
	 * @param cities
	 */
	public DistanceMatrix(ArrayList<String> cities) {
		
		this.distanceMatrix = new double[cities.size()][cities.size()];
		
		nameOfCities = new String[cities.size()];
		posX = new double[cities.size()];
		posY = new double[cities.size()];
		
		int i = 0;
		
		for(String c: cities) {
			String[] tokens = c.split(" ");
			/**
			 * I change the name of the city to be from 0 to cities.size() - 1 such that 
			 * I can use the name as index in the matrix
			 */
			nameOfCities[i] = tokens[0];
			posX[i] = Double.parseDouble(tokens[1]);
			posY[i] = Double.parseDouble(tokens[2]);
			           
			i++;
		}
		
		/**
		 * set the entry of the distance matrix
		 */
		for(int j = 0; j<nameOfCities.length; j++) {
			for(int k = 0; k<nameOfCities.length; k++) {
				distanceMatrix[j][k] = Math.sqrt(Math.pow(posX[j] - posX[k], 2) + Math.pow(posY[j] - posY[k], 2));
			}
		}
	}
	
	/**
	 * @return the matrix that contains all the distances between the cities
	 */
	public double[][] getDistanceMatrix() {
		return distanceMatrix;
	}
	
	/**
	 * @return the array that contains all the X positions
	 */
	public double[] getPosX() {
		return posX;
	}
	
	/**
	 * @return the array that contains all the X positions
	 */
	public double[] getPosY() {
		return posY;
	}
	/**
	 * @return the number of cities of this path
	 */
	public int getNumberOfCities(){
		return nameOfCities.length;
	}
	

}
