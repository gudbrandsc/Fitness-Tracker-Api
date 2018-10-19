const user_details = require("../models").User_Details;
const Exercise_Table = require("../models").Exercise_Table;
const Journal = require("../models").Journal;
const follower_table = require("../models").follower_table;
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const pg = require('pg');
var pool = new pg.Pool()
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://aaqnyekm:L4GFLLi9YRDJXcNBjKDdpvXWH1zFOdtg@pellefant.db.elephantsql.com:5432/aaqnyekm';
const Op = Sequelize.Op;

module.exports = {
  create(req, res) {
    return user_details
      .create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        StreetAddress: req.body.StreetAddress,
        City: req.body.City,
        State: req.body.State,
        Zipcode: req.body.Zipcode,
        UserName: req.body.UserName,
        Password: bcrypt.hashSync(req.body.Password, 8)
        // var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      })
      .then(user_details => res.status(201).send(user_details))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return user_details
      .findById(req.params.userid)
      .then(user_details => {
        if (!user_details) {
          return res.status(200).send({
            message: "User Not Found"
          });
        }
        return res.status(200).send(user_details);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return user_details
      .find({
        where: {
          id: req.params.userid
        }
      })
      .then(user_details => {
        if (!user_details) {
          return res.status(200).send({
            message: "User Not found"
          });
        }
        return user_details
          .update({
            FirstName: req.body.FirstName || user_details.FirstName,
            LastName: req.body.LastName || user_details.LastName,
            StreetAddress: req.body.StreetAddress || user_details.StreetAddress,
            City: req.body.City || user_details.City,
            State: req.body.State || user_details.State,
            Zipcode: req.body.Zipcode || user_details.Zipcode,
            UserName: req.body.UserName || user_details.UserName,
            Password: req.body.Password || user_details.Password
          })
          .then(() => res.status(200).send(user_details)) // Send back the updated todo.
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  
  listexerciseforuser(req, res) {
    return user_details
    .findById(req.params.userid, {
      include: [{
        model: Exercise_Table,
	  }]
    })
    .then(user_details => res.status(200).send(user_details))
    .catch(error => res.status(400).send(error));
   },
   
    listjournalforuser(req, res) {
    return user_details
    .findById(req.params.userid, {
      include: [{
        model: Journal,
	  }]
    })
    .then(user_details => res.status(200).send(user_details))
    .catch(error => res.status(400).send(error));
   },
 /*  
    listuserbyname(req, res) {
		const results = [];
	    const data = { name : req.params.name, userid : req.params.userid };
	    pool.connect(connectionString, (err, client, done) => {
	    var count = 0;
	    if(err)
	    {
			done();
			console.log(err);
			return res.status(500).json({success : false, data : err});
		}
		
	    const querystring = 'SELECT User_Details.*,CASE WHEN follower_tables.FollowerId = $1 then 'true' ELSE 'false' end as follows1  FROM User_Details left outer join follower_tables on FollowingId= User_Details.id where User_Details.FirstName = $2 or User_Details.LastName = $2';
		const query1 = client.query(querystring, [data.userid, data.name]);
		
		query1.on('row', (row) =>
		{
			results.push(row);
		});
		
		query1.on('end', () =>
		{
		return res.status(200).json(results);
		});
	});
},*/
   
   listuserbyname(req, res) {
	   return user_details
	   .findAll({
		    where: 
			   {
                [Op.or]: [{FirstName: req.params.name}, {LastName: req.params.name}]
               },
			include: [{
			model: follower_table,
			where: { FollowerId: req.params.userid},
			attributes:  [[Sequelize.literal('CASE WHEN "FollowerId" is not null THEN \'True\' ELSE \'False\' END'), 'followsNew']],
            paranoid: false, required: false			
			}],
		 })
		 .then(user_details => res.status(200).send(user_details))
         .catch(error => res.status(400).send(error));
   }, 
};
/*.find({
			where: {
				UserName: req.body.UserName
			}
		})
		.then(user_details => {
			if(user_details.length != 0){
				return res.status(200).send({
                message: 'UserName already exists',
                });
			}
			return user_details
			.create({
			FirstName : req.body.FirstName,
			LastName : req.body.LastName,
			StreetAddress : req.body.StreetAddress,
			City : req.body.City,
			State : req.body.State,
			Zipcode : req.body.Zipcode,
			UserName : req.body.UserName,
			Password : req.body.Password,
		    })
		   .then(user_details => res.status(200).send(user_details))
		   .catch(error => res.status(200).send(error));
		})
		.catch(error => res.status(200).send(error));
	 },
}; */
