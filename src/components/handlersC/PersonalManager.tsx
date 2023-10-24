import { ChangeEvent, FC, lazy, useEffect, useState } from "react"
import { CSSTransition } from "react-transition-group"

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTypeSelector } from "../../hooks/useTypeSelector"


interface PersonalManagerProps {
	inWidth?: boolean
}
const PersonalManager: FC<PersonalManagerProps> = ({ inWidth }) => {
	const [stateValues, setStateValues] = useState<any>({
		localTodo: [],
		localSubTodo: [],
		data: [{ name: '01', completed: 0, ongoing: 0, amt: 0 }],
		seeDescription: false,
		isCreatedTodo: false,
		nameTodo: "",
		subtitle: "",
		description: '',
		todosName: '',
		seeMoreTodo: { title: '', subtitle: '', description: '', subTodos: [], valueComplete: 0 }

	})
	useEffect(() => setStateValues({ ...stateValues, data: user.user.data.length === 0 ? [...stateValues.data, ...user.user.data] : user.user.data, localTodo: user.user.todo }), [])
	const { user, theme } = useTypeSelector(state => state),
		handlerAddSubTodo = () => stateValues.todosName && setStateValues({ ...stateValues, todosName: '', localSubTodo: [...stateValues.localSubTodo, { complete: false, title: stateValues.todosName }] }),
		handlerRemoveSubTodo = (title: string) => setStateValues({ ...stateValues, localSubTodo: stateValues.localSubTodo.filter((chat: any) => chat.title !== title) }),
		handlerSetTodoItem = async () => {
			if (stateValues.nameTodo && stateValues.subtitle && stateValues.description && stateValues.localSubTodo.length !== 0) {

				setStateValues({ ...stateValues, localSubTodo: [], nameTodo: '', todosName: '', subtitle: '', isCreatedTodo: false, description: '', data: [...stateValues.data, { name: `${stateValues.data.length + 1}`, completed: 0, ongoing: 1, amt: stateValues.data.length + 1 }], localTodo: [...stateValues.localTodo, { title: stateValues.nameTodo, subtitle: stateValues.subtitle, description: stateValues.description, subTodos: stateValues.localSubTodo, valueComplete: 0 }] })

				await fetch('https://calm-bayou-24720.herokuapp.com/user/setTodo', {
					headers: {
						'Content-Type': 'application/json',
					},
					method: "POST",
					body: JSON.stringify({ userName: user.user.name, pinnedChats: [...stateValues.localTodo, { title: stateValues.nameTodo, subtitle: stateValues.subtitle, description: stateValues.description, subTodos: stateValues.localSubTodo, valueComplete: 0 }] })
				})
				await fetch('https://calm-bayou-24720.herokuapp.com/user/setData', {
					headers: {
						'Content-Type': 'application/json',
					},
					method: "POST",
					body: JSON.stringify({ userName: user.user.name, data: [...stateValues.data, { name: `${stateValues.data.length + 1}`, completed: 0, ongoing: 1, amt: stateValues.data.length + 1 }] })
				})
			}
		},
		handlerSeeDescription = (todo: any) => setStateValues({ ...stateValues, seeDescription: true, seeMoreTodo: { description: todo.description, subTodos: todo.subTodos, subtitle: todo.subtitle, title: todo.title, valueComplete: todo.valueComplete } }),
		handlerComplete = async (title: string) => {
			const subTodos: any = [...stateValues.seeMoreTodo.subTodos.filter((chat: any) => chat.title !== title), { title, complete: true }],
				newTodoLocal = stateValues.localTodo.filter((todo: any) => todo.title !== stateValues.seeMoreTodo.title)

			setStateValues({ ...stateValues, localTodo: [...newTodoLocal, { description: stateValues.seeMoreTodo.description, subTodos, subtitle: stateValues.seeMoreTodo.subtitle, title: stateValues.seeMoreTodo.title, valueComplete: stateValues.seeMoreTodo.valueComplete + 1 }] })

			await fetch('https://calm-bayou-24720.herokuapp.com/user/setTodo', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: "POST",
				body: JSON.stringify({ userName: user.user.name, pinnedChats: [...newTodoLocal, { description: stateValues.seeMoreTodo.description, subTodos, subtitle: stateValues.seeMoreTodo.subtitle, title: stateValues.seeMoreTodo.title, valueComplete: stateValues.seeMoreTodo.valueComplete + 1 }] })
			})


		},
		handlerSetSeeMoreTodo = () => setStateValues({ ...stateValues, seeDescription: false }),

		handlerDeleteTodoItem = async (todo: any, e: any) => {
			e.stopPropagation()
			const newData = [...stateValues.data, { name: `${stateValues.data.length + 1}`, completed: 1, ongoing: 0, amt: stateValues.data.length + 1 }],
				newArray = stateValues.localTodo.filter((todoS: any) => todoS.title !== todo.title)

			setStateValues({ ...stateValues, localTodo: newArray, data: newData })
			await fetch('https://calm-bayou-24720.herokuapp.com/user/setData', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: "POST",
				body: JSON.stringify({ userName: user.user.name, data: newData })
			})
			await fetch('https://calm-bayou-24720.herokuapp.com/user/setTodo', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: "POST",
				body: JSON.stringify({ userName: user.user.name, pinnedChats: newArray })
			})

		}

	return (
		<div className={inWidth ? `personal__manager width-all ${theme.isLigthTheme ? "ligth__personal" : ""}` : `personal__manager ${theme.isLigthTheme ? "ligth__personal" : ""}`}>
			<div className={`presonal__head ${theme.isLigthTheme ? "black" : ""}`}>
				<p>Менаджер</p>

			</div>
			<div className={inWidth ? 'presonal__projects flex' : "presonal__projects"}>
				<p>проекты <span>({stateValues.localTodo.length})</span></p>
				{stateValues.localTodo.length === 0 ? <p className="noTodosL">Добавьте новую задачу</p> : ''}

				<div className="create__project" onClick={() => setStateValues({ ...stateValues, isCreatedTodo: true })}>
					<svg enableBackground="new 0 0 32 32" height="30px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg" ><g><polyline fill="none" points="   649,137.999 675,137.999 675,155.999 661,155.999  " stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /><polyline fill="none" points="   653,155.999 649,155.999 649,141.999  " stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /><polyline fill="none" points="   661,156 653,162 653,156  " stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /></g><g><path d="M16,30c-3.74,0-7.255-1.456-9.899-4.101C1.779,21.578,0.753,15.025,3.547,9.595C3.8,9.104,4.402,8.911,4.894,9.163   c0.491,0.252,0.685,0.855,0.432,1.347C2.931,15.165,3.81,20.781,7.515,24.485C9.781,26.752,12.794,28,16,28   c3.205,0,6.219-1.248,8.485-3.515S28,19.205,28,16c0-3.206-1.248-6.219-3.515-8.485S19.206,4,16,4   c-3.206,0-6.219,1.249-8.485,3.515c-0.391,0.391-1.023,0.391-1.414,0s-0.391-1.023,0-1.414C8.745,3.457,12.26,2,16,2   c3.74,0,7.256,1.457,9.899,4.101C28.544,8.745,30,12.26,30,16c0,3.739-1.456,7.255-4.101,9.899C23.256,28.544,19.74,30,16,30z" /></g><g><path d="M16,22c-0.552,0-1-0.447-1-1V11c0-0.552,0.448-1,1-1s1,0.448,1,1v10C17,21.553,16.552,22,16,22z" /></g><g><path d="M21,17H11c-0.552,0-1-0.448-1-1s0.448-1,1-1h10c0.553,0,1,0.448,1,1S21.553,17,21,17z" /></g></svg>
				</div>
				{stateValues.localTodo.map((todo: any, i: number) => <div key={i} className={`personal__project margin ${i === 0 ? 'active__project' : ''} `} onClick={() => handlerSeeDescription(todo)}>
					<div className="UI">UI</div>
					<div className="project__name">{todo.title}</div>
					<div className="project__description-small">{todo.subtitle}</div>
					<div className="wrapper__project">
						<div className="projects__users-tree">
							<img width="27px" height="27px" src={user.user.avatarSRC || 'https://www.meme-arsenal.com/memes/5eae5104f379baa355e031fa1ded886c.jpg'} alt="userProject" />
						</div>
						<div className="set__complete-project">
							<input type="range" readOnly value={todo.valueComplete} max={todo.subTodos.length} />
							{todo.valueComplete === todo.subTodos.length ? <>
								<small className="completeTodoTitle">Закончено</small>
								<small className="completeTodoDelete" onClick={(e) => handlerDeleteTodoItem(todo, e)}>Удалить</small>
							</> : ''}
						</div>
					</div>
				</div>)}




			</div>
			<p className="statistics__manager">Статистика</p>
			<CSSTransition in={stateValues.isCreatedTodo} classNames='alert' timeout={100} unmountOnExit>
				<>
					<div className="wrapper__created-bg" onClick={() => setStateValues({ ...stateValues, isCreatedTodo: false })}></div>
					<div className={`created__wrapper ${theme.isLigthTheme ? "light" : ""}`}>
						<p className="close__alert" onClick={() => setStateValues({ ...stateValues, isCreatedTodo: false })}>&#10006;</p>
						<div className={`created__form ${theme.isLigthTheme ? "black" : ""}`}>
							<p>Создайте свою задачу</p>
							<input type="text" required value={stateValues.nameTodo} placeholder="Введите название задачи" onChange={(e: ChangeEvent<HTMLInputElement>) => setStateValues({ ...stateValues, nameTodo: e.target.value })} />
							<input type="text" required value={stateValues.subtitle} placeholder="Введите подзаголовок задачи" onChange={(e: ChangeEvent<HTMLInputElement>) => setStateValues({ ...stateValues, subtitle: e.target.value })} />
							<input type="text" required value={stateValues.description} placeholder="Введите описание задачи" onChange={(e: ChangeEvent<HTMLInputElement>) => setStateValues({ ...stateValues, description: e.target.value })} />
							<input type="text" value={stateValues.todosName} className="textSubTodo" placeholder="Добавьте подзадачу" onChange={(e: ChangeEvent<HTMLInputElement>) => setStateValues({ ...stateValues, todosName: e.target.value })} />

							{stateValues.localSubTodo.map((todo: any, i: number) => <div className="subTodoItem" key={i}>
								{i + 1}.  <p>{todo.title}</p>   <div className="completeTodo" onClick={() => handlerRemoveSubTodo(todo.title)}>&#10006;</div>
							</div>)}
							{stateValues.localSubTodo.length === 0 ? <small className="noneSubTodos">добавьте подзадачи!</small> : ''}
							<button className="addTodo" onClick={handlerAddSubTodo}>Добавить подзадачу</button>


							<button type='submit' onClick={handlerSetTodoItem}>Сохранить</button>
						</div>

					</div>

				</>
			</CSSTransition>
			<CSSTransition in={stateValues.seeDescription} classNames='alert' timeout={100} unmountOnExit>
				<>
					<div className="wrapper__created-bg" onClick={() => setStateValues({ ...stateValues, seeDescription: false })}></div>
					<div className={`created__wrapper ${theme.isLigthTheme ? "light" : ""}`}>
						<p className="close__alert" onClick={() => setStateValues({ ...stateValues, seeDescription: false })}>&#10006;</p>
						<div className="created__form">
							<p className={`seeMoreTitle ${theme.isLigthTheme ? "black" : ""}`}>название: {stateValues.seeMoreTodo.title}</p>
							<small className={`seeMoreSubtitle ${theme.isLigthTheme ? "black" : ""}`}>подзаголовок: {stateValues.seeMoreTodo.subtitle}</small>
							<p className={`seeMoreDescription ${theme.isLigthTheme ? "black" : ""}`}>описание: {stateValues.seeMoreTodo.description}</p>
							<small className={`seeMoreSubtitle ${theme.isLigthTheme ? 'black' : ""}`}>Задачи</small>
							{stateValues.seeMoreTodo.subTodos.map((todo: any, i: number) => <div className="subTodoItem" key={i}>
								{i + 1}.  <p className={todo.complete ? 'lineTodoComplete wrapperTitle' : 'wrapperTitle'}>{todo.title}</p> {todo.complete ? '' : <input type="checkbox" onChange={() => handlerComplete(todo.title)} className="completeTodo checkbox" />}
							</div>)}
							<button type='submit' onClick={handlerSetSeeMoreTodo}>Сохранить</button>
						</div>

					</div>

				</>
			</CSSTransition>





			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					width={343}
					height={100}
					data={stateValues.data}

				>
					<CartesianGrid strokeDasharray="2 2" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="completed" stroke="#8884d8" activeDot={{ r: 8 }} />
					<Line type="monotone" dataKey="ongoing" stroke="#82ca9d" />
				</LineChart>
			</ResponsiveContainer>
		</div >
	)
}
export default PersonalManager