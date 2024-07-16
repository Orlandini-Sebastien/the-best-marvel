import { Separator } from './ui/separator';

interface HeadingProps {
	title: string;
	subTitle: string;
}

const Heading: React.FC<HeadingProps> = ({ title, subTitle }) => {
	return (
		<div className="common-padding">
			<h1 className="h2">{title}</h1>
			<Separator className="w-1/2 h-1 mb-1" />
			<h5 className="h6">{subTitle}</h5>
		</div>
	);
};

export default Heading;
