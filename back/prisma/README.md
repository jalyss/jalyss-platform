# for generate and migration

yarn generate 
yarn migrate:dev
 <!-- creation and deploy and if database is empty it will run the seed -->


# for deploy migration
yarn migrate:deploy <!-- deploy all new  migration in the database -->

# for generate and reset

yarn generate 
yarn migrate:reset <!-- drop database and deploy all migration  and run the seed -->

# for create new migrate 

yarn migrate:dev:create <!-- create migration without deploy-->

# for running seed
yarn seed <!-- run seed -->