'use client';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const router = useRouter();
	return (
		<div className="flex-center mx-auto common-padding bg-background font-comic ">
			<div className="w-full max-w-[1400px] dark:bg-dot-red-100/[0.2] bg-dot-red-800/[0.2]  ">
				<div className="flex justify-between p-2">
					<ModeToggle />
					<Button
						onClick={() => {
							router.push('/');
						}}
						variant={'outline'}
						className="flex gap-2"
					>
						<Undo2 className="h-4 w-4" />
						<div>Back</div>
					</Button>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Layout;
