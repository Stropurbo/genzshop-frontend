import HeroCarosoul from "../components/Home/carosol/HeroCarosoul";
import TwoCaro from "./TwoCaro";

const ThreeCaro = () => {
    return (
		<div className="w-full ">

			<div className="flex flex-col lg:flex-row gap-5 px-4 sm:px-5 lg:px-5 w-full">
				<div className="w-full lg:w-2/3">
					<HeroCarosoul />
				</div>

				<div className="w-full lg:w-1/3">
					<TwoCaro />
				</div>
			</div>
		</div>
	)
}
export default ThreeCaro;