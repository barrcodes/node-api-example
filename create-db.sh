# This imports the contents of .env to the current shell
if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

export SQL_FILE="$(pwd)/db/init-db.sql"

psql -h '127.0.0.1' -p $PGPORT -U $PGUSER -f $SQL_FILE