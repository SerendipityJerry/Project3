import { pool } from './database.js'
import './dotenv.js'

const createEventsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS gifts;

        CREATE TABLE IF NOT EXISTS gifts (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            time TIMESTAMP NOT NULL,
            image VARCHAR(255) NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 events table created successfully')
    } catch (err) {
        console.error('⚠️ error creating events table', err)
    }
}

const seedEventsTable = async () => {
    await createEventsTable()

    giftData.forEach((event) => {
        const insertQuery = {
            text: 'INSERT INTO events (title, date, time, image) VALUES ($1, $2, $3, $4)'
        }

        const values = [
            event.id
            event.title
            event.date
            event.time
            event.image
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting gift', err)
                return
            }

            console.log(`✅ ${event.title} added successfully`)
        })
    })
}

seedGiftsTable()