interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex-center mx-auto common-padding bg-background font-comic ">
			<div className="w-full max-w-[1400px] dark:bg-dot-red-100/[0.2] bg-dot-red-800/[0.2] ">
				{children}
			</div>
		</div>
	);
};

export default Layout;
