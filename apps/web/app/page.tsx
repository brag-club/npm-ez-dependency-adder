'use client';

import { ClipboardDocumentIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Contributors from '@/components/Contributors';
import DependenciesList from '@/components/DependenciesList';
import Results from '@/components/Results';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/ui/Button';

function useDebounce(callback: (t: string) => Promise<void> | void) {
	let timeout: null | NodeJS.Timeout = null;

	return (txt: string) => {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
		const t = setTimeout(() => {
			callback(txt);
			timeout = null;
		}, 500);
		timeout = t;
	};
}

export default function Home() {
	const [searched, setSearched] = useState('');
	const [results, setResults] = useState<ISearchResults>();

	const [dependencies, setDependencies] = useState<string[]>([]);
	const [devDependencies, setDevDependencies] = useState<string[]>([]);

	const [prefPMInstallCmd, setPrefPMInstallCmd] = useState<PackageManagers>('yarn add');
	const [preContentRead, setPreContentRead] = useState<boolean>(false);

	const searchParams = useSearchParams();

	const preFetch = searchParams.get('pre') ?? '';

	const search = useDebounce(async (input: string) => {
		try {
			if (input === '') {
				return setResults(undefined);
			}
			const res = await axios.get('https://registry.npmjs.com/-/v1/search', {
				params: {
					text: input,
					size: 50,
					from: 0,
					quality: 0.65,
					popularity: 0.98,
				},
			});
			const data = res.data as ISearchResults;

			if (!data) return setResults(undefined);
			setResults(data);
			setSearched(input);
		} catch {
			toast.error('Error Searching for packages');
		}
	});

	const removeDependencyFromList = (old: string[], dependency: string) => {
		return old.filter(dep => dep !== dependency);
	};

	const addDependency = (dependency: string) => {
		if (devDependencies.includes(dependency)) {
			setDevDependencies(old => removeDependencyFromList(old, dependency));
		}

		setDependencies(old => [...old, dependency]);
	};

	const addDevDependency = (dependency: string) => {
		if (dependencies.includes(dependency)) {
			setDependencies(old => removeDependencyFromList(old, dependency));
		}

		setDevDependencies(old => [...old, dependency]);
	};

	const selectPackageManager = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPrefPMInstallCmd(e.target.value as PackageManagers);
	};

	const buttomInteraction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const interactSent: ButtonInteraction = e.currentTarget.value as ButtonInteraction;
		e.preventDefault();

		toast.success('Copied to clipboard');

		switch (interactSent) {
			case 'copy dep': {
				navigator.clipboard.writeText(`${prefPMInstallCmd} ${dependencies.join(' ')}`);

				break;
			}
			case 'copy devDep': {
				navigator.clipboard.writeText(`${prefPMInstallCmd} -D ${devDependencies.join(' ')}`);

				break;
			}
			case 'reset': {
				setDependencies([]);
				setDevDependencies([]);

				break;
			}

			case 'share': {
				const depData = JSON.stringify([dependencies, devDependencies]);
				const preFetch = Buffer.from(depData).toString('base64');
				const url = new URL(window.location.href);
				url.searchParams.set('pre', preFetch);
				navigator.clipboard.writeText(url.toString());

				break;
			}
		}
	};

	const removeDependency = (dependency: string) => {
		return () => {
			setDependencies(old => old.filter(dep => dep !== dependency));
		};
	};

	const removeDevDependency = (dependency: string) => {
		return () => {
			setDevDependencies(old => old.filter(dep => dep !== dependency));
		};
	};

	useEffect(() => {
		if (preContentRead || !preFetch) return;
		const depData = Buffer.from(preFetch, 'base64').toString('utf8');
		const [deps, devDeps] = JSON.parse(depData);
		setDependencies(deps);
		setDevDependencies(devDeps);
		setPreContentRead(true);
	}, [preContentRead, preFetch]);

	return (
		<main className="mx-auto flex h-screen justify-center px-28 py-10">
			<Toaster />
			<div className="flex w-1/2 flex-col px-4">
				<SearchBar onSearch={search} />
				{!results?.objects?.length && (
					<div className="flex h-full w-full flex-col items-center justify-center">
						<img
							src="/noresult.jpg"
							alt="no result"
							className="h-30 w-60 rounded-2xl object-contain"
						/>
						<p className="mt-4 text-xl text-gray-500">Noting to show</p>
					</div>
				)}
				{results && results.objects?.length > 0 && (
					<>
						<h2 className="my-10 text-4xl font-semibold ">Search results: {searched}</h2>
						<Results
							addDependency={dep => () => addDependency(dep)}
							addDevDependency={dep => () => addDevDependency(dep)}
							dependencies={dependencies}
							devDependencies={devDependencies}
							results={results}
						/>
					</>
				)}
			</div>
			<div className="flex w-1/2 flex-col px-4 py-12">
				{dependencies.length === 0 && devDependencies.length === 0 && (
					<>
						<p className="mb-2 text-lg font-semibold">
							Select Dependencies that you want to install in your project
						</p>
						<div className="dependencies flex w-full py-9">
							<div className="dependency mx-auto flex flex-col items-center justify-center gap-2">
								<img
									src="/logo.svg"
									alt="npm logo"
									className="h-30 w-60 object-contain object-center"
								/>
							</div>
						</div>
					</>
				)}

				{dependencies.length > 0 && (
					<DependenciesList
						name="Dependencies"
						dependencies={dependencies}
						onRemove={removeDependency}
					/>
				)}
				{devDependencies.length > 0 && (
					<DependenciesList
						name="Dev Dependencies"
						dependencies={devDependencies}
						onRemove={removeDevDependency}
					/>
				)}
				<div className="commands-section mt-auto flex w-full flex-col gap-5">
					<div className="selector">
						<label htmlFor="location" className="block text-sm font-medium leading-6 text-white">
							Prefered Package Manager
						</label>
						<select
							id="location"
							name="location"
							className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
							defaultValue="pnpm"
							onChange={selectPackageManager}
						>
							<option value={'yarn add'}>Yarn</option>
							<option value={'npm install'}>Npm</option>
							<option value={'pnpm add'}>Pnpm</option>
							<option value={'bun add'}>Bun</option>
						</select>
					</div>
					<div className="command">
						<p className="mb-3 font-medium">Dependencies</p>
						<div className="flex w-full items-center overflow-hidden rounded-lg border border-primary shadow">
							<code className="h-full w-full overflow-x-auto bg-gray-50 px-4 py-2 text-black">
								<p className="w-max pr-4">
									{dependencies.length > 0
										? `${prefPMInstallCmd} ${dependencies.join(' ')}`
										: 'Nothing Selected'}
								</p>
							</code>
							<Button className="rounded-none" onClick={buttomInteraction} value={'copy dep'}>
								<ClipboardDocumentIcon className="h-6 w-6" />
							</Button>
						</div>
					</div>
					<div className="command">
						<p className="mb-3 font-medium">Dev Dependencies</p>
						<div className="flex w-full items-center overflow-hidden rounded-lg border border-primary shadow">
							<code className="h-full w-full overflow-x-auto bg-gray-50 px-4 py-2 text-black">
								<p className="w-max pr-4">
									{devDependencies.length > 0
										? `${prefPMInstallCmd} -D ${devDependencies.join(' ')}`
										: 'Nothing Selected'}
								</p>
							</code>
							<Button className="rounded-none" onClick={buttomInteraction} value={'copy devDep'}>
								<ClipboardDocumentIcon className="h-6 w-6" />
							</Button>
						</div>
					</div>
					<div className="command flex justify-center gap-2 px-1">
						<Button className="rounded-none" onClick={buttomInteraction} value={'reset'}>
							<div className="flex items-center justify-center">
								<TrashIcon className="h-6 w-6" />
								<p className="ml-2">Reset</p>
							</div>
						</Button>
						<Button className="rounded-none" onClick={buttomInteraction} value={'share'}>
							<div className="flex items-center justify-center">
								<ShareIcon className="h-6 w-6" />
								<p className="ml-2">Share</p>
							</div>
						</Button>
					</div>
					<Contributors />
				</div>
			</div>
		</main>
	);
}
