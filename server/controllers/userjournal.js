const user_details = require("../models").User_Details;
const user_journal = require("../models").Journal;
const follower_details = require("../models").follower_table;
const Sequelize = require("sequelize");
const pg = require('pg');
const Op = Sequelize.Op;

module.exports = {
  create(req, res) {
    return user_journal
      .create({
        Journal: req.body.Journal,
        UserId: req.body.UserId,
        imageurl: req.body.ImageUrl
      })
      .then(journal_entry =>
        res
          .status(200)
          .send({ journalAdded: true, journalEntry: journal_entry })
      )
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return user_details
      .findById(req.params.userid, {
        include: [
          {
            model: user_journal
          }
        ]
      })
      .then(journal_entries => {
        return res.status(200).send(journal_entries);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    var id = req.body.id;
    var newjournalentry = req.body.journal;
    var ImageUrl = req.body.ImageUrl;

    return user_journal
      .findById(id)
      .then(journal => {
        if (!journal) {
          return res.status(400).send({
            message: "Journal with id does not exist"
          });
        }

        return journal
          .update({
            Journal: newjournalentry,
            imageurl: ImageUrl
          })
          .then(() => res.status(200).send(journal))
          .catch(error => res.status(400).send("error = " + error));
      })
      .catch(error => res.status(400).send("error = " + error));
  },

  deletejournal(req, res) {
    return user_journal
      .find({
        where: {
          id: req.params.id
        }
      })
      .then(journal_entry => {
        if (!journal_entry) {
          return res.status(200).send({
            message: "Journal with given id does not exist"
          });
        }

        return journal_entry
          .destroy()
          .then(() =>
            res.status(200).send({
              message: "Journal entry with given id was successfully removed."
            })
          )
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  getnewsfeed(req, res) {
	  //get list of people you are following
      follower_details.findAll({
        where: {
          FollowerId: req.params.followerid
        },
        include: [
          {
            model: user_details
          }
        ]
      })
      .then(function(follower_details) 
	  { 
		console.log('Entered here');
        const responseJson = [];
		const results = [];
		if(follower_details.length <= 100)
		{
			user_journal.findAll({
			 where: {
					UserId: { [Op.in]: Sequelize.literal( "(Select \"follower_tables\".\"FollowingId\" from follower_tables where \"follower_tables\".\"FollowerId\" = " +req.params.followerid + ")") 
						}
				},
			include: [
				{
				model: user_details
				}
			],
			order: [
            ['createdAt', 'DESC'],
			 ],
			 limit: 50
		}).then(details => res.status(200).send(details))
	   .catch(error => res.status(200).send(error));
	   }
	   else if(follower_details.length >=100 && follower_details.length <=200)
	   {
		   user_journal.findAll({
			 where: {
					UserId: { [Op.in]: Sequelize.literal( "(Select \"follower_tables\".\"FollowingId\" from follower_tables where \"follower_tables\".\"FollowerId\" = " +req.params.followerid + ")") 
						},
					createdAt: {  [Op.gte]: moment().subtract(2, 'days').toDate()
					}
				},
			include: [
				{
				model: user_details
				}
			],
			order: [
            ['createdAt', 'DESC'],
			 ],
			 limit: 50
		}).then(details => res.status(200).send(details))
	   .catch(error => res.status(200).send(error));
	   }
	   else
	   {
		   user_journal.findAll({
			 where: {
					UserId: { [Op.in]: Sequelize.literal( "(Select \"follower_tables\".\"FollowingId\" from follower_tables where \"follower_tables\".\"FollowerId\" = " +req.params.followerid + ")") 
						},
					createdAt: {  [Op.gte]: moment().subtract(1, 'days').toDate()
					}
				},
			include: [
				{
				model: user_details
				}
			],
			order: [
            ['createdAt', 'DESC'],
			 ],
			 limit: 50
		}).then(details => res.status(200).send(details))
	   .catch(error => res.status(200).send(error));
	   }
		   
		   
		
		/*const tempSQL = sequelize.dialect.QueryGenerator.selectQuery(follower_details,{
                       attributes: ['FollowingId'],
                       where: {
                             FollowerId: req.params.followerid
                             }})
							.slice(0,-1);
		user_journal.find({
        where: {
        UserId: {
             $In: sequelize.literal('(' + tempSQL + ')'),
           }
       } 
       })
	   .then(details => res.status(200).send(details))
	   .catch(error => res.status(200).send(error)); */
		/*pg.connect(connectionString, (err, client, done) => {
	    var count = 0;
	    if(err)
	    {
			done();
			console.log(err);
			return res.status(500).json({success : false, data : err});
		}
		console.log('connection successfull');
	    const querystring = 'SELECT user_details.*, Journals.* fron Journals inner join user_details on user_details.id = Journals.UserId where Journals.UserId in (Select FollowingId from follower_tables where FollowerId = $1) order by createdAt DESC' ;
		const query1 = client.query(querystring, [req.params.followerid]);
		console.log('executed query');
		query1.on('row', (row) =>
		{
			results.push(row);
		});
		console.log('results are' +results);
		query1.on('end', () =>
		{
		for (var i in results) {
          var jsonTemp = {
            LastName: "",
            FirstName: "",
            UserName: "",
			ImageUrl: "",
			Journal: ""
          };
          
          jsonTemp.FirstName = results[i].FirstName;
          jsonTemp.LastName = results[i].LastName;
          jsonTemp.UserName = results[i].UserName;
		  jsonTemp.ImageUrl = results[i].ImageUrl;
		  jsonTemp.Journal =  results[i].Journal;
          responseJson.push(jsonTemp);
        }
		return res.status(200).json(responseJson);
		});
	}); */
  })
  .catch(error => res.status(200).send(error)); 
  } 
	  
};
