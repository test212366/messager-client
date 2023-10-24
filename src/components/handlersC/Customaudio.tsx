import { useEffect, useRef, useState } from "react"
const Customaudio = ({ url, you }: any) => {
	const [stateValues, setStateValues] = useState<any>({
		isPlay: false,
		timeAudio: '0:00',
		audioRange: [],

	}),
		audio = useRef<HTMLAudioElement>(null),
		updateTrack = () => {
			let sec: any = Math.floor(audio.current?.duration || 0),
				min: any = Math.floor(sec / 60)
			min = min >= 10 ? min : min
			sec = Math.floor(sec % 60)
			sec = sec >= 10 ? sec : '0' + sec
			if (min === 'infinity' || min === Infinity) return
			setStateValues({ ...stateValues, timeAudio: min + ":" + sec })
		},
		playAudio = () => {
			setStateValues({ ...stateValues, isPlay: !stateValues.isPlay })
			stateValues.isPlay ? audio.current?.pause() : audio.current?.play()
		}
	useEffect(() => {
		let i
		if (stateValues.audioRange.length !== 26) for (i = 0; i < 26; i++) setStateValues({ ...stateValues, audioRange: [...stateValues.audioRange, { height: `${Math.floor(Math.random() * 23) + 2}px` }] })
	}, [stateValues.audioRange])

	return (
		<div className="audioLocal">
			<div className={`audio__wrapper ${`audioMessage ${you ? "youAudio" : "noUAudio"}`}`}>
				<div className={`audio__wrapper-listen`} style={stateValues.isPlay ? { transition: `${audio.current?.duration === Infinity ? 5 : audio.current?.duration}s linear all`, width: '100%' } : undefined}></div>
				<button className="audio__play" onClick={playAudio}>
					{stateValues.isPlay ? <svg version="1.1" id="Capa_1" height='30px' width='30px' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
						viewBox="0 0 512 512"  >
						<g>
							<g>
								<path d="M256,0C114.842,0,0,114.842,0,256s114.842,256,256,256s256-114.842,256-256S397.158,0,256,0z M256,465.455
			c-115.493,0-209.455-93.961-209.455-209.455S140.507,46.545,256,46.545S465.455,140.507,465.455,256S371.493,465.455,256,465.455z
			"/>
							</g>
						</g>
						<g>
							<g>
								<path d="M318.061,139.636c-12.853,0-23.273,10.42-23.273,23.273v186.182c0,12.853,10.42,23.273,23.273,23.273
			c12.853,0,23.273-10.42,23.273-23.273V162.909C341.333,150.056,330.913,139.636,318.061,139.636z"/>
							</g>
						</g>
						<g>
							<g>
								<path d="M193.939,139.636c-12.853,0-23.273,10.42-23.273,23.273v186.182c0,12.853,10.42,23.273,23.273,23.273
			c12.853,0,23.273-10.42,23.273-23.273V162.909C217.212,150.056,206.792,139.636,193.939,139.636z"/>
							</g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
					</svg> : <svg version="1.1" id="Capa_1" height='30px' width='30px' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
						viewBox="0 0 60 60"   >
						<g>
							<path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
		c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
		C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
							<path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
		S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
						<g>
						</g>
					</svg>}
				</button>
				<div className="audio__range">
					{stateValues.audioRange.map((item: any, i: number) => <div key={i} style={item} className="audio__range-item"></div>)}
				</div>
				<div className="audio__time">
					{stateValues.timeAudio}
				</div>
			</div>
			<audio ref={audio} onTimeUpdate={() => updateTrack()} onEnded={() => setStateValues({ ...stateValues, isPlay: false })} src={url.url || url} className='disNone' />
		</div>
	)
}
export default Customaudio