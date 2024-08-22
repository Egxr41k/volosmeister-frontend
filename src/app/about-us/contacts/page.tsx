import InstagramIcon from '../../icons/instagram.svg'
import MessengerIcon from '../../icons/messenger.svg'
import TelegramIcon from '../../icons/telegram.svg'
import ViberIcon from '../../icons/viber.svg'
import logo from '../../imgs/logo.png'

const Contacts = () => {
	return (
		<div className="relative">
			<img
				src={logo}
				alt=""
				className="mx-auto h-[90vh] object-cover opacity-10"
			/>

			<div className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-2/4 -translate-y-2/4 items-center justify-center bg-opacity-80">
				<div className="text-center text-black">
					<h2 className="mb-10 text-2xl">
						Якщо у вас ще залищились питання,
						<br />
						то ми з радістю відповімо на них
						<br />
						у наши соц мережах.
						<br />
						<span className="font-semibold">Звертайтеся!</span>
					</h2>

					<div className="flex flex-col gap-4">
						<a
							href="#"
							className="mx-auto rounded-md border-0 bg-black px-4 py-2 font-semibold text-white duration-300 ease-in-out hover:bg-fuchsia-600 focus:bg-fuchsia-700"
						>
							<div className="flex">
								<img src={TelegramIcon} className="" alt="" />
								<p className="mx-1 my-auto text-white">Telegram</p>
							</div>
						</a>

						<a
							href="#"
							className="mx-auto rounded-md border-0 bg-black px-4 py-2 font-semibold text-white duration-300 ease-in-out hover:bg-fuchsia-600 focus:bg-fuchsia-700"
						>
							<div className="flex">
								<img src={ViberIcon} className="" alt="" />
								<p className="mx-1 my-auto text-white">Viber</p>
							</div>
						</a>

						<a
							href="#"
							className="mx-auto rounded-md border-0 bg-black px-4 py-2 font-semibold text-white duration-300 ease-in-out hover:bg-fuchsia-600 focus:bg-fuchsia-700"
						>
							<div className="flex">
								<img src={InstagramIcon} className="" alt="" />
								<p className="mx-1 my-auto text-white">Instagram</p>
							</div>
						</a>

						<a
							href="#"
							className="mx-auto rounded-md border-0 bg-black px-4 py-2 font-semibold text-white duration-300 ease-in-out hover:bg-fuchsia-600 focus:bg-fuchsia-700"
						>
							<div className="flex">
								<img src={MessengerIcon} className="" alt="" />
								<p className="mx-1 my-auto text-white">Messenger</p>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Contacts
