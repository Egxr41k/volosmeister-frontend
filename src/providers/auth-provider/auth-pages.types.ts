import { NextPage } from 'next'

export enum Role {
	User = 'user',
	Admin = 'admin'
}

export type TypeRoles = {
	isOnlyFor?: Role
}

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles

export type TypeComponentAuthFields = { Component: TypeRoles }
