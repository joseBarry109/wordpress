<form method="get" id="searchform" action="<?php echo $_SERVER['PHP_SELF']; ?>">
<div><input type="text" value="<?php echo bb_specialchars($s, 1); ?>" name="s" id="s" />
<input type="submit" id="searchsubmit" name="Submit" value="Go!" />
</div>
</form>