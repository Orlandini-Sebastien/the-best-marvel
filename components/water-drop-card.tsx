import Image from 'next/image';
import { ScrollParallax } from 'react-just-parallax';

import ClipPath from '@/svg/ClipPath';
import GradienBorderSVG from '@/svg/GradientBorderSVG';
import BackgroundLight from '@/design/gradient-light';
import { Character } from '@/type';

interface WaterDropCardProps {
	item: Character;
}

const WaterDropCard: React.FC<WaterDropCardProps> = ({ item }) => {
	return (
		<ScrollParallax strength={0.1 + Math.random() * 0.2}>
			{/* Image avec clipPath et avec une bordur svg */}

			<div className="relative">
				<ClipPath />
				{/* L'image */}
				<div
					className="absolute top-0 left-0"
					style={{ clipPath: 'url(#drop)' }}
				>
					<div className="w-[600px] h-[600px]">
						<Image
							className="object-cover p-16"
							src={item.thumbnail.path + '.' + item.thumbnail.extension}
							alt="spidy"
							fill
						/>
					</div>
				</div>
				{/* La bordure */}
				<div className="w-[600px]">
					<GradienBorderSVG />
				</div>
				<div className="w-[600px] absolute top-0 left-0 -z-10">
					<BackgroundLight />
				</div>
			</div>
		</ScrollParallax>
	);
};

export default WaterDropCard;
