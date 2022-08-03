# This imports the contents of .env to the current shell
if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

export CREATE_DB="$(pwd)/db/create-db.sql"
export CREATE_TABLES="$(pwd)/db/create-tables.sql"
psql -h $PGHOST -p $PGPORT -U $PGUSER -f $CREATE_DB
psql -h $PGHOST -p $PGPORT -U $PGUSER -f $CREATE_TABLES -d $PGDB