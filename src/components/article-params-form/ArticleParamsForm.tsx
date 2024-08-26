import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { RadioGroup } from 'components/radio-group';
import styles from './ArticleParamsForm.module.scss';
import { useState, FormEvent } from 'react';
import clsx from 'clsx';
import {
	OptionType,
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from '../../constants/articleProps';

type ArticleParamsFormProps = {
	setParams: (object: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setParams } = props;

	const [params, setParamsForm] =
		useState<ArticleStateType>(defaultArticleState);

	const handlerFunction = (selected: string) => {
		return (object: OptionType) => {
			setParamsForm({
				...params,
				[selected]: object,
			});
		};
	};

	const handleApply = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setParams(params);
	};

	const handleReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setParamsForm(defaultArticleState);
		setParams(defaultArticleState);
	};

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openForm = () => {
		setIsOpen(isOpen === false ? true : false);
	};

	return (
		<>
			<div
				className={clsx(styles.overlay, isOpen && styles.overlay_open)}
				onClick={() => setIsOpen(false)}></div>
			<ArrowButton isOpen={isOpen} onClick={openForm} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={clsx(styles.form)}
					onReset={handleReset}
					onSubmit={handleApply}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						selected={params.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handlerFunction('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='Размер шрифта'
						selected={params.fontSizeOption}
						options={fontSizeOptions}
						onChange={handlerFunction('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						selected={params.fontColor}
						options={fontColors}
						onChange={handlerFunction('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator></Separator>
					<Select
						selected={params.backgroundColor}
						options={backgroundColors}
						onChange={handlerFunction('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={params.contentWidth}
						options={contentWidthArr}
						onChange={handlerFunction('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
