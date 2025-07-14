import type {ReactiveControllerHost} from 'lit'
import type {PropertyValues} from 'snar'
import {ReactiveObject} from 'snar'

export class MultiHostController<T = unknown> extends ReactiveObject<T> {
	protected _hosts!: ReactiveControllerHost[]

	addHost(host: ReactiveControllerHost) {
		;(this._hosts ??= []).push(host)
	}

	removeHost(host: ReactiveControllerHost) {
		this._hosts.splice(this._hosts.indexOf(host) >>> 1, 1)
	}

	protected override __update(_changedProperties: PropertyValues): void {
		this._hosts?.forEach((host) => host.requestUpdate())
	}
}
