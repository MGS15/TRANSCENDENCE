import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Win from '../../assets/Wins.png'
import Loss from '../../assets/Loss.png'
import Draw from '../../assets/Draws.png'

export default function Stats(){
	const data = [
		{
		  name: 'JANUARY',
		  ' WINS ' : 5,
		  ' LOSSES ': 3,
		  ' DRAWS ': 2,
		},
		{
		  name: 'FEBRUARY',
		  ' WINS ' : 15,
		  ' LOSSES ': 6,
		  ' DRAWS ': 7,
		},
		{
		  name: 'MARCH',
		  ' WINS ' : 5,
		  ' LOSSES ': 7,
		  ' DRAWS ': 5,
		},
		{
		  name: 'APRIL',
		 ' WINS ' : 25,
		  ' LOSSES ': 11,
		  ' DRAWS ': 8,
		},
		{
		  name: 'MAY',
		 ' WINS ' : 31,
		  ' LOSSES ': 14,
		  ' DRAWS ': 8,
		},
		{
		  name: 'JUNE',
		  ' WINS ' : 53,
		  ' LOSSES ': 10,
		  ' DRAWS ': 17,
		},
		{
		  name: 'JULY',
		  ' WINS ' : 50,
		  ' LOSSES ': 33,
		  ' DRAWS ': 22,
		},
		{
		  name: 'AUGUST',
		  ' WINS ' : 39,
		  ' LOSSES ': 13,
		  ' DRAWS ': 6,
		},
		{
		  name: 'SEPTEMBER',
		  ' WINS ' : 16,
		  ' LOSSES ': 5,
		  ' DRAWS ': 4,
		},
		{
		  name: 'OCTOBER',
		  ' WINS ' : 72,
		  ' LOSSES ': 21,
		  ' DRAWS ': 11,
		},
		{
		  name: 'NOVEMBER',
		 ' WINS ' : 89,
		  ' LOSSES ': 35,
		  ' DRAWS ': 14,
		},
		{
		  name: 'DECEMBER',
		  ' WINS ' : 7,
		  ' LOSSES ': 3,
		  ' DRAWS ': 2,
		}
	];
	return (
		<div className="max-w-[1536px] min-[0px]:pr-12 min-[0px]:py-12 2xl:px-[110px] 2xl:py-12 h-[600px] m-auto border-solid border-4 border-black shadow-[2px_4px_0px_0px_#000301] min-[0px]:mx-5 2xl:m-auto">
			<ResponsiveContainer >
				<LineChart 
				data={data}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" type="category" width={4} padding="gap"/>
					<YAxis type="number"/>
					<Tooltip />
					<Legend iconType='rect' iconSize={15} height={8}/>
					<Line dataKey=" WINS " stroke="#24BEC8" strokeWidth={5}/>
					<Line dataKey=" LOSSES " stroke="#F18DB3"strokeWidth={5}/>
					<Line dataKey=" DRAWS " stroke="#0076C0"strokeWidth={5}/>
				</LineChart >
				</ResponsiveContainer>
		</div>
	);
}
