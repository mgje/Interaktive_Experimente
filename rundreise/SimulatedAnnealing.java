import java.util.Random;

/**
 * Simulated annealing
 * @author Lucia Blondel
 */

public class SimulatedAnnealing {
	
	private final DistanceMatrix distanceMatrix;
	private int[] path;
	private Random r;
	private TwoOpt twoOpt;
	
	private String nameOfMap;
	
	private final Tool tool = new Tool();
        
        // Annealingconfig
        double T = 0.4;
	double alpha = 0.98;
	boolean initialTwoOpt = false;
        
        int[] current;
        
        int[] best;
        
        double bestCost;
        
        double currentCost;
        
 

	/**
	 * Constructor
	 * @param distanceMatrix instance
	 * @param nameOfMap: name of the map
	 */
	public SimulatedAnnealing(final DistanceMatrix distanceMatrix) {
		
		this.distanceMatrix = distanceMatrix;
		r = new Random(1234254555);
		twoOpt = new TwoOpt(distanceMatrix.getDistanceMatrix());
	}

	/**
	 * This method is our implementation of the simulated annealing
	 */


	public void initSimulatedAnnealing() {
		
		
		
		// compute the nearest neighbour and set the path to be the initial path
		current = new NearestNeighbor(distanceMatrix.getDistanceMatrix(), 0).getPath();
		twoOpt.setPath(current);
		
		if(initialTwoOpt) {
                        //System.out.println("initTwoOpt");
			twoOpt.twoOpt(current, false);
		}
		
		// set the best path as the current one
		best = new int[current.length];
		for(int j = 0; j < current.length; j++) {
			best[j] = current[j];
                        //System.out.println("best:"+Integer.toString(j)+" current: "+Integer.toString(current[j]));
		}
	
		bestCost = tool.computeCost(current, distanceMatrix.getDistanceMatrix());
		currentCost = bestCost;
	}

        public void runSimulatedAnnealing() {
                //long start = System.nanoTime();
		// store the initial values
		// until we have time
		//while(true){
			//System.out.println(T + " " + bestCost + " " + currentCost);
			
			// if we haven't run out of time
			//if (((System.nanoTime()) - start) * Math.pow(10, -9) > 0.00000001) {
			//	break;
			//}
			// initialize i
			int i = 0;
			// until we are not at equilibrium for this temperature
			while( i < 50*current.length) {
				// generate random two indices
				int rI = r.nextInt(current.length);
				int rJ = r.nextInt(current.length);
				// check if they are equal
				if(rI == rJ) {
					rJ = (rJ+1) % current.length;
				}
				// check, if the second is smaller than the first swap them
				if(rJ < rI) {
					int temp = rJ;
					rJ = rI;
					rI = temp;
				}
				// compute the gain
				double delta = twoOpt.computeGain(rI, rJ);
				// if we have a negative gain
				if(delta < 0 ) {
					// exchange edges (rI, rI+1), (rJ, rJ+1) with (rI, rJ), (rJ+1, rI+1)
					twoOpt.exchange(rI, rJ);
					currentCost = tool.computeCost(current, distanceMatrix.getDistanceMatrix());
					// if the current cost is less than the best, reset the best cost
					if(currentCost < bestCost) {
                                                        //System.out.println("new path");
							int[] temp = twoOpt.getPath();
							for (int j = 0; j < temp.length; j++) {
								best[j] = temp[j];
							}
							bestCost = currentCost;
					}
					// otherwise choose "random" between the current and the next solutions
					// the next-current solution
				} else {
					double a = r.nextInt(100)/100.0;
                                        double evalue = Math.exp(-delta/T);
					if(a < evalue && delta*delta > 0.01) {
						twoOpt.exchange(rI, rJ);
						currentCost = tool.computeCost(current, distanceMatrix.getDistanceMatrix());
                                                bestCost = currentCost;
					}
				}
				i++;
			}
			// decrease the temperature
			T = alpha * T;
		//}

		// compute a twoOpt without first improvement
		//twoOpt.twoOpt(best, false);
	
				
		// get the path
		path = twoOpt.getPath();
		
	}
	
	/**
	 * @return the path
	 */
	public int[] getPath() {
		return path;
	}
	

        /**
	 * @return the path
	 */
	public double getCost() {
		return bestCost;
	}
	
}
