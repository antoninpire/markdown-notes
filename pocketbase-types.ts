/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Folders = "folders",
	Notes = "notes",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type FoldersRecord = {
	label: string
	userId: RecordIdString
}

export type NotesRecord = {
	title: string
	content?: string
	folderId?: RecordIdString
	userId: RecordIdString
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type FoldersResponse<Texpand = unknown> = FoldersRecord & BaseSystemFields<Texpand>
export type NotesResponse<Texpand = unknown> = NotesRecord & BaseSystemFields<Texpand>
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	folders: FoldersRecord
	notes: NotesRecord
	users: UsersRecord
}